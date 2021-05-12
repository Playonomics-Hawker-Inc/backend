import { Module } from "@nestjs/common";
import {UploadService} from "./upload.service";
import {UploadController} from "./upload.controller";
import { ImageModule } from './image.module';
;
@Module({
    imports:[UploadService, ImageModule],
    providers:[UploadService],
    controllers:[UploadController]
})
export class UploadModule {}