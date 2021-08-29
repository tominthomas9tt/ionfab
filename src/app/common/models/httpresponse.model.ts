import { Errorresponse } from "./errorresponse.model";

export class Httpresponse {
    public status: number | undefined;
    public data: any | undefined;
    public error: Errorresponse[] | undefined;
    public infoDtls: any | undefined;
}
