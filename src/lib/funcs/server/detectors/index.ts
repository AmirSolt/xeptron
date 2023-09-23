
import {PRIVATE_ORIGINALITY_KEY, PRIVATE_SAPLING_KEY, PRIVATE_ZEROGPT_KEY, PRIVATE_ZEROGPT_EMAIL, PRIVATE_ZEROGPT_PASSWORD} from '$env/static/private'


class DetectorModule {
    creditMulti: number = 0
    detector: Detector = {
        pfpSrc: "",
        name: "name",
        url: "",
        id: "id",
    }
    async getHumanPerc(text: string): Promise<number|null> {
        return -1
    }
}

class Originality extends DetectorModule {
    detector: Detector = {
        pfpSrc: "/originality.png",
        name: "Originality",
        url: "",
        id: "Originality",
    }
    async getHumanPerc(text: string): Promise<number|null> {


        let myHeaders = new Headers();
        myHeaders.append("X-OAI-API-KEY", PRIVATE_ORIGINALITY_KEY);
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Content-Type", "application/json");

        let raw = JSON.stringify({
            "content": text,
            "title": "",
            "aiModelVersion": "1",
            "storeScan": "\"false\""
        });

        let requestOptions:RequestInit  = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        let response = await fetch("https://api.originality.ai/api/v1/scan/ai", requestOptions)
        let data = await response.json()
        // console.log("================")
        // console.log("Originality")
        // console.log(data)
        // console.log("================")
        if(!response.ok){
            return null
        }else{
            const humanPercValue = data.score.original*100
            return humanPercValue
        }
 
    }
}

class Sapling extends DetectorModule {
    detector: Detector = {
        pfpSrc: "/sapling.png",
        name: "Sapling",
        url: "",
        id: "Sapling",
    }
    async getHumanPerc(text: string): Promise<number|null> {

        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        let raw = JSON.stringify({
            "text": text,
            "key": PRIVATE_SAPLING_KEY,
        });

        let requestOptions:RequestInit  = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
        };
        let response = await fetch('https://api.sapling.ai/api/v1/aidetect', requestOptions)
        let data = await response.json()
        // console.log("================")
        // console.log("Sapling")
        // console.log(data)
        // console.log("================")
        if(!response.ok){
            return null
        }else{
            return (1 - data.score)*100
        }

    }
}

class ZeroGPT extends DetectorModule {
    token:string|null=null
    detector: Detector = {
        pfpSrc: "/zerogpt.png",
        name: "ZeroGPT",
        url: "",
        id: "ZeroGPT",
    }
    constructor(){
        super()
        this.login()
    }

    async login(){
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        let raw = JSON.stringify({
            "email": PRIVATE_ZEROGPT_EMAIL,
            "password": PRIVATE_ZEROGPT_PASSWORD,
        });
        let requestOptions:RequestInit  = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
        };

        let response = await fetch('https://api.zerogpt.com/api/auth/login', requestOptions)
        let data = await response.json()
        if(!response.ok){
            this.token = null
        }else{
            this.token = data.data.token
        }
    }
    async getHumanPerc(text: string): Promise<number|null> {

        if(this.token==null)
            return null
        let myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${this.token}` );
        myHeaders.append("ApiKey", PRIVATE_ZEROGPT_KEY);
        myHeaders.append("Content-Type", "application/json");

        let raw = JSON.stringify({
            "input_text": text
        });

        let requestOptions:RequestInit  = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
        };


        let response = await fetch('https://api.zerogpt.com/api/detect/detectText', requestOptions)
        let data = await response.json()
        // console.log("================")
        // console.log("ZERO GPT")
        // console.log(data)
        // console.log("================")
        if(!response.ok){
            return null
        }else{
            return 100-data.data.fakePercentage
        }
    }
}

const detectorModules: DetectorModule[] = [
    new Originality(),
    new Sapling(),
    new ZeroGPT(),
]

export const detectors: Detector[] = detectorModules.map(detectorModule => detectorModule.detector)




export async function detectText(id: string, text: string): Promise<DetectorResponse> {

    const detectorModule = detectorModules.find(detectorModule => detectorModule.detector.id === id)
    if (detectorModule == null) {
        return {
            errorMessage: "Detector Id is wrong",
            humanPerc: -1,
        }
    }

    let humanPerc:number|null = null
    try{
        humanPerc = await detectorModule.getHumanPerc(text)
    }catch (err) {
        ;
    }
    if (humanPerc == null || humanPerc < 0) {
        return {
            errorMessage: "Detector has failed",
            humanPerc: -1,
        }
    }
    return {
        errorMessage: null,
        humanPerc: humanPerc,
    } as DetectorResponse
}


