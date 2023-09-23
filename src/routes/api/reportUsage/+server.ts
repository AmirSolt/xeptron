
import { insertUsageReport } from "$lib/funcs/server/database";
import { json } from "@sveltejs/kit";

export const POST = async ({request}) => {
    let input = await request.json()
    const usageReport:UsageReport = input.usageReport

    await insertUsageReport(usageReport)

    return json({success:true})
};
