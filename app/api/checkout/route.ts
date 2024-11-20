import Stripe from "stripe";
import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function POST(
  req: Request,
  {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    params,
  }: {
    params: Promise<{
      carId: string;
      priceDay: string;
      startDate: Date;
      endDate: Date;
      carName: string;
    }>;
  }
) {
  try {
    const { userId } = await auth();
    const { carId, priceDay, startDate, endDate, carName } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!carId) {
      return new NextResponse("Car id are required", { status: 400 });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    //console.log("[START DATE]", start);
    //console.log("[END DATE]", end);

    const millisecondsPerDay = 24 * 60 * 60 * 1000;
    const differenceInMilliseconds = end.getTime() - start.getTime();

    const numberOfDays = Math.ceil(
      differenceInMilliseconds / millisecondsPerDay
    );

    const totalAmount = Number(priceDay) * numberOfDays;
    const totalAmountStripe = Number(priceDay) * 100 * numberOfDays;

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [
      {
        quantity: 1,
        price_data: {
          currency: "EUR",
          product_data: {
            name: carName,
          },
          unit_amount: totalAmountStripe,
        },
      },
    ];

    const order = await db.order.create({
      data: {
        carId,
        carName: carName,
        userId: userId,
        status: "confirmed",
        totalAmount: totalAmount.toString(),
        orderDate: startDate,
        orderEndDate: endDate,
      },
    });

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      billing_address_collection: "required",
      phone_number_collection: {
        enabled: true,
      },
      success_url: `${process.env.NEXT_PUBLIC_FRONTED_STORE_URL}/order-confirmation`,
      cancel_url: `${process.env.NEXT_PUBLIC_FRONTED_STORE_URL}/order-error`,
      metadata: {
        orderId: order.id,
        carId: carId,
        startDate,
        endDate,
        numberOfDays,
      },
    });

    return NextResponse.json(
      { url: session.url },
      {
        headers: corsHeaders,
      }
    );
  } catch (error) {
    console.log("[CAR FORM RESERVE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
