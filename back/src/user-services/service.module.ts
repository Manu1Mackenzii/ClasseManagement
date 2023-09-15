import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from 'src/users/users.module';
import { CategoryService } from './category.service';
import { Category, CategorySchema } from './schemas/category.schema';
import { Service, ServiceSchema } from './schemas/service.schema';
import { ServiceController } from './service.controller';
import { SvcService } from './service.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Service.name, schema: ServiceSchema },
      { name: Category.name, schema: CategorySchema },
    ]),
    HttpModule,
    ConfigModule,
    UsersModule
  ],
  controllers: [ServiceController],
  providers: [
    SvcService,
    CategoryService
  ],
  exports: [
    SvcService,
    CategoryService
  ]
})
export class ServiceModule {}
