import { timingSafeEqual } from "node:crypto";
import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

function isValidSecret(received: string | null) {
	const expected = process.env.REVALIDATE_SECRET;
	if (!expected || !received) return false;

	const a = Buffer.from(received);
	const b = Buffer.from(expected);
	return a.length === b.length && timingSafeEqual(a, b);
}

export async function POST(request: NextRequest) {
	if (!isValidSecret(request.headers.get("x-revalidate-secret"))) {
		return NextResponse.json({ ok: false }, { status: 401 });
	}

	revalidateTag("wordpress", "max");

	return NextResponse.json({ ok: true, revalidatedAt: Date.now() });
}
