import { Request } from "express";
import * as multer from "multer";
import * as path from "path";

export class FileConfiguration {

    private storage: multer.StorageEngine

    constructor(){
        this.storage = multer.diskStorage({
            destination: this.destination,
            filename: this.fileName
        });
    }

    public getStorage() : multer.StorageEngine {
        
        return this.storage; 
    }

    private destination(req: Request, file: any, callback: CallableFunction): void {
        // the file will be uploaded inside the root location of the project
        // then under the public/uploads/ folder
        callback(null, path.join(__dirname, '../../public/uploads/'));
    }

    private fileName (req: any, file: { originalname: string; mimetype: string | number; },
        callback: (arg0: null, arg1: string) => void) {

        const name = file.originalname.split('.')[0];
        callback(null, name + Date.now() + '.' + file.originalname.split('.')[1]);
    }
    
}

export class FileUploader {

    public static file: multer.Multer = multer({
        storage: new FileConfiguration().getStorage(),
        fileFilter: FileUploader.fileFilter
    });

    public static fileFilter(req: Request, file: any, callback: CallableFunction){
    
        if(file.originalname.split('.')[1] === 'pdf'){

            callback(null, true);
        }else{

            callback(new Error('pdf is the only file extension type that is allowed'));
        }

    }
}