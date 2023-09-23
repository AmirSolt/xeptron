interface AITextForm{
    url:string
    title:string
    explanation:string
    placeholder:string
    isStreamingOver:boolean
    input:string
    response:string
    formRows:number
}


interface Detector{
    pfpSrc:string;
    name:string;
    url:string
    id:string
}
interface DetectorResponse{
    errorMessage:string|null
    humanPerc:number
}

interface UsageReport{
    input_len:number
    output_len:number
}
