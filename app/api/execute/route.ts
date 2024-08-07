import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { language, code, testCase } = body;

    const response = await fetch("https://emkc.org/api/v2/piston/execute", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        language: language,
        version: "*", // Use the latest version
        files: [
          {
            content: code,
          },
        ],
      }),
    });

    const data = await response.json();
    if (response.ok) {
      return NextResponse.json({
        ...data,
      });
      //   if (actualOutput === testCase.expected) {
      //     return NextResponse.json({
      //       success: true,
      //       isTestPassed: true,
      //       ...data,
      //     });
      //   } else {
      //     return NextResponse.json({
      //       success: true,
      //       isTestPassed: false,
      //       ...data,
      //     });
      //   }
    }
    console.log(data.run.output.trim());
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: (error as Error).message,
    });
  }
}
