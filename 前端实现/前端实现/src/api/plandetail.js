import http from '@/utils/http'

export async function getPlanAPI(dates,destination,budget,count) {
    try {
        const result = await http({
            url: 'plan',
            params: {
                dates:dates,
                destination:destination,
                budget:budget,
                count:count
            }
        });
        return result;
    } catch (error) {
        console.log(error);
    }
}
