import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WordpressService } from '@core/services/wordpress/wordpress.service';
import { WcOrderType } from '@features/admin-board/models/wc-orders.type';

@Component({
  selector: 'app-stripe-payment-setup',
  templateUrl: './stripe-payment-setup.component.html',
  styleUrls: ['./stripe-payment-setup.component.scss']
})
export class StripePaymentSetupComponent {

  orderData: WcOrderType;
  productId: string = '';
  dataUpdated: boolean = false;

  productName: string;

  errors: string = '';
  submitLoading: boolean = false;
  productsLoading: boolean = true;
  stripeProducts: any[];

  constructor(
    public dialogRef: MatDialogRef<StripePaymentSetupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: WcOrderType,
    private wordpressService: WordpressService
  ) {
    this.orderData = data;
    this.getStripeProducts();
    this.getStripeCustomerSources();
    /**
    * trigger close if clicked outside
    */
    dialogRef.backdropClick().subscribe({
      next: () => this.close()
    });
  }

  getStripeProducts() {
    this.productsLoading = true;
    this.wordpressService.getStripeProducts().subscribe({
      next: (res: any) => {
        this.stripeProducts = res.data;
        this.productName = this.getProductName(this.orderData.stripe_product_meta);
        this.productsLoading = false;
      },
      error: (err: any) => {
        this.productsLoading = false;
      }
    })
  }
  getStripeCustomerSources() {
    // this.productsLoading = true;
    this.wordpressService.getStripeCustomerSources(this.orderData.stripe_customer_id).subscribe({
      next: (res: any) => {
        console.log('sources', res);
        
        // this.curtomerSources = res.data;
        // this.productName = this.getProductName(this.orderData.stripe_product_meta);
        // this.productsLoading = false;
      },
      error: (err: any) => {
        // this.productsLoading = false;
      }
    })
  }

  close() {
    this.dialogRef.close(this.dataUpdated ? this.data : undefined);
  }

  /**
   * Setup payment
   */
  setupPayment() {
    this.submitLoading = true;
    this.errors = '';

    this.wordpressService
      .createStripeSubscription(this.productId, this.orderData.stripe_customer_id, this.orderData.order_id)
      .subscribe({
        next: (res: any) => {
          console.log('Subscription', res);
          this.submitLoading = false;
          if (res?.object == 'subscription') {
            this.close();
            this.dataUpdated = true;
          } else {
            this.errors = res.message ?? res?.error?.message;
          }
        },
        error: (err: any) => {
          console.log(err);
          this.submitLoading = false;
        }
      })
  }

  getProductName(productId: string): string {
    const product = this.stripeProducts.find((e) => {
      return e.id == productId;
    });
    return product ? product.name : '';
  }
}
