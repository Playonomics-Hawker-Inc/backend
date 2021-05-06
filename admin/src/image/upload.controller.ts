import { Controller, Post, UploadedFiles, UseInterceptors, Req, Res } from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";
import {multerOptions} from "./config";
import {UploadService} from "./upload.service";

@Controller('upload')
export class UploadController {
    constructor(private readonly uploadService: UploadService) {}
    @Post()
    // @UseInterceptors(FilesInterceptor('file',null,multerOptions))
    // async uploadFile(@UploadedFiles() file) { 
    //     console.log(file)
    // }
    async create(@Req() request, @Res() response) {
        try {
            await this.uploadService.ImageUpload(request, response);
          } catch (error) {
            return response
              .status(500)
              .json(`Failed to upload image file: ${error.message}`);
          }

    }

}