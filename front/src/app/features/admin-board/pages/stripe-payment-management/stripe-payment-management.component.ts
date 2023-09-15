import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { WordpressService } from '@core/services/wordpress/wordpress.service';
import { StripePaymentSetupComponent } from '@features/admin-board/components/stripe-payment-setup/stripe-payment-setup.component';
import { WcOrderType } from '@features/admin-board/models/wc-orders.type';
import { AgGridAngular } from 'ag-grid-angular';
import { CellClickedEvent, ColDef, GridOptions, GridReadyEvent, IRowNode } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { AG_GRID_LOCALE_FR } from 'src/locale/ag-grid.locale.fr';

@Component({
  selector: 'app-stripe-payment-management',
  templateUrl: './stripe-payment-management.component.html',
  styleUrls: ['./stripe-payment-management.component.scss']
})
export class StripePaymentManagementComponent {

  public columnDefs: ColDef[] = [
    { headerName: 'Order_id', field: 'order_id', filter: 'agTextColumnFilter' },
    { headerName: 'First_name', field: 'first_name', filter: 'agTextColumnFilter' },
    { headerName: 'Last_name', field: 'last_name', filter: 'agTextColumnFilter' },
    { headerName: 'Email', field: 'email', filter: 'agTextColumnFilter' },
    { headerName: 'Phone_number', field: 'phone_number', filter: 'agTextColumnFilter' },
    { headerName: 'Stripe_customer_id', field: 'stripe_customer_id', filter: 'agTextColumnFilter' },
    { headerName: 'Payment_method', field: 'payment_method', filter: 'agTextColumnFilter' },
    { headerName: 'Order_status', field: 'order_status', filter: 'agTextColumnFilter' },
    { headerName: 'Date_created', field: 'date_created', filter: 'agTextColumnFilter' },
    { headerName: 'Product_id', field: 'product_id', filter: 'agTextColumnFilter' },
    { headerName: 'Variation_id', field: 'variation_id', filter: 'agTextColumnFilter' },
    { headerName: 'Product_name', field: 'product_name', filter: 'agTextColumnFilter' },
    { headerName: 'Quantity', field: 'quantity', filter: 'agTextColumnFilter' },
    { headerName: 'Subtotal', field: 'subtotal', filter: 'agTextColumnFilter' },
    { headerName: 'Total', field: 'total', filter: 'agTextColumnFilter' },
    { headerName: 'Tax', field: 'tax', filter: 'agTextColumnFilter' },
    { headerName: 'Payment_options', field: 'payment_options', filter: 'agTextColumnFilter' },
    { headerName: 'Class_level', field: 'class_level', filter: 'agTextColumnFilter' },
    { headerName: 'Class_day_hour', field: 'class_day_hour', filter: 'agTextColumnFilter' },
    { headerName: 'Order_Total_Price', field: 'order_total', filter: 'agTextColumnFilter' },
    { headerName: 'Coupons_discount_ht', field: 'coupons_discount', filter: 'agTextColumnFilter' },
    { headerName: 'Coupons_discount_tax', field: 'coupons_discount_tax', filter: 'agTextColumnFilter' },
    { headerName: 'Coupons', field: 'coupons', filter: 'agTextColumnFilter' },
    { headerName: 'Formule DUO', field: 'formule_duo', filter: 'agTextColumnFilter' },
    { headerName: 'Stripe Product Meta', field: 'stripe_product_meta', filter: 'agTextColumnFilter' },
    { headerName: 'Stripe Subscription Meta', field: 'stripe_subscription_meta', filter: 'agTextColumnFilter' }
  ];

  public gridOptions: GridOptions = {
    rowClassRules: {
      'grid-success-row': (params: any) => {
        return params.data.stripe_subscription_meta !== '';
      }
    }
  }

  localeFr = AG_GRID_LOCALE_FR;

  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    floatingFilter: true,
    suppressMenu: true,
    resizable: true
  }

  public presentielRawData$!: Observable<WcOrderType[]>;
  public onlineRawData$!: Observable<WcOrderType[]>;
  @ViewChild('presentielGrid') presentielAgGrid!: AgGridAngular;
  @ViewChild('onlineGrid') onlineAgGrid!: AgGridAngular;


  activeTab: number = 2;
  onlineTabIndex = 1;
  presentielTabIndex = 2;

  refreshLoading: boolean = false;
  hasSelection: boolean = false;

  selectedRowNode: IRowNode | undefined;
  selectedOrder: WcOrderType | undefined;

  /**
   * Group by ORDER_ID
   */

  public constructor(
    private wordpressService: WordpressService,
    public editDialog: MatDialog
  ) {
  }

  /**
 * Open modal for edition
 */
  openEditDialog(data: WcOrderType): void {
    const dialogRef = this.editDialog.open(StripePaymentSetupComponent, {
      panelClass: 'regular-dialog',
      data: data
    });

    dialogRef.afterClosed().subscribe({
      next: (formData: WcOrderType | undefined) => {
        if (formData && this.selectedRowNode) {
          // this.selectedRowNode.setData(formData);
          this.fetchAllData();
        }
      }
    });
  }

  onGridReady(params: GridReadyEvent) {
    this.onlineRawData$ = this.wordpressService.getUserOrdersWC('ONLINE');
    this.presentielRawData$ = this.wordpressService.getUserOrdersWC('PRESENTIEL');
  }

  // Example of consuming Grid Event
  onCellClicked(e: CellClickedEvent): void {
    this.hasSelection = true;
    this.selectedRowNode = e.node;
    this.selectedOrder = e.data;
  }

  // Example using Grid's API
  clearSelection(): void {
    this.presentielAgGrid.api.deselectAll();
    this.onlineAgGrid.api.deselectAll();
    this.hasSelection = false;
    this.selectedOrder = undefined;
  }

  onDataUpdated() {
    this.refreshLoading = false;
  }

  fetchAllData() {
    this.refreshLoading = true;
    this.onlineRawData$ = this.wordpressService.getUserOrdersWC('ONLINE');
    this.presentielRawData$ = this.wordpressService.getUserOrdersWC('PRESENTIEL');
    this.presentielAgGrid.api.redrawRows();
    this.onlineAgGrid.api.redrawRows();
  }

  setupStripePayment() {
    if (this.selectedOrder) {
      this.openEditDialog(this.selectedOrder);
    }
  }

  /**
   * Set active tab
   */
  setActiveTab(index: number) {
    this.activeTab = index;
  }
}
