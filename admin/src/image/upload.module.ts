import { Module } from "@nestjs/common";
import {UploadService} from "./upload.service";
import {UploadController} from "./upload.controller";
;
@Module({
    imports:[UploadService],
    providers:[UploadService],
    controllers:[UploadController]
})
export class UploadModule {}