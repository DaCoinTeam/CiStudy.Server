import { Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Courses')
@Controller('course')
export class CoursesController {

    @ApiCreatedResponse({ })
    @Post()
    createCourse() {
        return 'this route handle create course'
    }
}
