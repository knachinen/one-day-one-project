import { NextResponse } from "next/server";
import puppeteer from "puppeteer";
import { validateRequest } from "@/lib/auth";

export async function GET(
	_request: Request,
	{ params }: { params: { id: string } },
) {
	const { user } = await validateRequest();

	if (!user) {
		return new NextResponse("Unauthorized", { status: 401 });
	}

	const projectId = params.id;
	const url = `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/projects/${projectId}/preview`;

	try {
		const browser = await puppeteer.launch({ headless: "new" });
		const page = await browser.newPage();

		// Set cookie to authenticate the headless browser session
		const sessionCookie = {
			name: "lucia_session",
			value: user.id, // Assuming user.id is the session id
			url: new URL(url).origin,
		};
		await page.setCookie(sessionCookie);

		await page.goto(url, { waitUntil: "networkidle0" });

		// Inject print-specific CSS
		await page.addStyleTag({ path: "public/print.css" });

		const pdf = await page.pdf({
			format: "A4",
			printBackground: true,
			margin: {
				top: "1in",
				right: "1in",
				bottom: "1in",
				left: "1in",
			},
		});

		await browser.close();

		return new NextResponse(pdf, {
			status: 200,
			headers: {
				"Content-Type": "application/pdf",
				"Content-Disposition": `attachment; filename="PRD-${projectId}.pdf"`,
			},
		});
	} catch (error: any) {
		console.error("Error generating PDF:", error);
		return new NextResponse(`Error generating PDF: ${error.message}`, {
			status: 500,
		});
	}
}
