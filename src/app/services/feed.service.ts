import { Injectable } from '@angular/core';
import {Feed} from "../model/feed.class";

@Injectable({
  providedIn: 'root'
})
export class FeedService {
  constructor() { }

  public findAllFeeds(): Feed[] { return []; }
}
