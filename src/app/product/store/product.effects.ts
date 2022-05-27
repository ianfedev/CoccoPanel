import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, exhaustMap, map, of} from "rxjs";
import {ProductService} from "./product.service";
import {list, listError, listSuccess} from "./product.actions";
import {MaterialService} from "../../material/store/material.service";

@Injectable()
export class ProductEffects {

    constructor(
        private actions$: Actions,
        private productService: ProductService,
        private materialService: MaterialService
    ) {}

    public list$ = createEffect(() =>
        this.actions$.pipe(
            ofType(list),
            exhaustMap((action) => this.productService.query({})
                .pipe(
                    map(products => listSuccess({products})),
                    catchError((error) => of(listError(error)))
                )
            )
        )
    );

}