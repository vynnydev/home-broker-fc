/* eslint-disable no-useless-constructor */
import { Controller, Get, MessageEvent, Param, Sse } from '@nestjs/common'
import { Observable, map } from 'rxjs'
import { AssetsDailyService } from './asset-daily.service'

@Controller('assets/:id/daily')
export class AssetsDailyController {
  constructor(private assetsDaily: AssetsDailyService) {}

  @Get()
  all(@Param('id') id: string) {
    return this.assetsDaily.findAll(id)
  }

  @Sse('events')
  events(@Param('id') id: string): Observable<MessageEvent> {
    return this.assetsDaily.subscribeEvents(id).pipe(
      map((event) => ({
        type: event.event,
        data: event.data,
      })),
    )
  }
}
