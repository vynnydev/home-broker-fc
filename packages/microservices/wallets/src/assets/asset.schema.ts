/* eslint-disable no-use-before-define */
import { Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type AssetDocument = HydratedDocument<Asset>

@Schema({
  collection: 'Asset',
})
export class Asset {}

export const AssetSchema = SchemaFactory.createForClass(Asset)
