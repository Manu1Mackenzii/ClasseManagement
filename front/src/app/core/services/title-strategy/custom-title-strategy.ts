import { Injectable } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { RouterStateSnapshot, TitleStrategy } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { environment } from "src/environments/environment";

/**
 * Title Strategy
 */
@Injectable()
export class CustomTitleStrategy extends TitleStrategy {
    constructor(
        private readonly title: Title,
        private translate: TranslateService
    ) {
        super();
    }
    override updateTitle(snapshot: RouterStateSnapshot): void {
        const title = this.buildTitle(snapshot);
        if (title !== undefined) {
            this.title.setTitle(this.translate.instant(title));
        } else {
            this.title.setTitle(environment.defaultPageTitle);
        }
    }
}