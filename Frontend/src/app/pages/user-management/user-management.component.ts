import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { StaffDetailComponent } from "../dialog/staff-detail/staff-detail.component";
import { MessageService } from "primeng/api";
import { CustomerDetailComponent } from "../dialog/customer-detail/customer-detail.component";
import { StaffService } from "app/service/staff.service";

@Component({
  selector: "app-user-management",
  templateUrl: "./user-management.component.html",
  styleUrls: ["./user-management.component.css"],
  encapsulation: ViewEncapsulation.None,
})
export class UserManagementComponent implements OnInit {
  datas: any[] = [
    {
      id: "1000",
      code: "f230fh0g3",
      name: "Bamboo Watch",
      description: "Product Description",
      image: "bamboo-watch.jpg",
      price: 65,
      category: "Accessories",
      quantity: 24,
      inventoryStatus: "INSTOCK",
      rating: 5,
    },
    {
      id: "1001",
      code: "nvklal433",
      name: "Black Watch",
      description: "Product Description",
      image: "black-watch.jpg",
      price: 72,
      category: "Accessories",
      quantity: 61,
      inventoryStatus: "INSTOCK",
      rating: 4,
    },
    {
      id: "1002",
      code: "zz21cz3c1",
      name: "Blue Band",
      description: "Product Description",
      image: "blue-band.jpg",
      price: 79,
      category: "Fitness",
      quantity: 2,
      inventoryStatus: "LOWSTOCK",
      rating: 3,
    },
    {
      id: "1003",
      code: "244wgerg2",
      name: "Blue T-Shirt",
      description: "Product Description",
      image: "blue-t-shirt.jpg",
      price: 29,
      category: "Clothing",
      quantity: 25,
      inventoryStatus: "INSTOCK",
      rating: 5,
    },
    {
      id: "1004",
      code: "h456wer53",
      name: "Bracelet",
      description: "Product Description",
      image: "bracelet.jpg",
      price: 15,
      category: "Accessories",
      quantity: 73,
      inventoryStatus: "INSTOCK",
      rating: 4,
    },
    {
      id: "1005",
      code: "av2231fwg",
      name: "Brown Purse",
      description: "Product Description",
      image: "brown-purse.jpg",
      price: 120,
      category: "Accessories",
      quantity: 0,
      inventoryStatus: "OUTOFSTOCK",
      rating: 4,
    },
    {
      id: "1006",
      code: "bib36pfvm",
      name: "Chakra Bracelet",
      description: "Product Description",
      image: "chakra-bracelet.jpg",
      price: 32,
      category: "Accessories",
      quantity: 5,
      inventoryStatus: "LOWSTOCK",
      rating: 3,
    },
    {
      id: "1007",
      code: "mbvjkgip5",
      name: "Galaxy Earrings",
      description: "Product Description",
      image: "galaxy-earrings.jpg",
      price: 34,
      category: "Accessories",
      quantity: 23,
      inventoryStatus: "INSTOCK",
      rating: 5,
    },
    {
      id: "1008",
      code: "vbb124btr",
      name: "Game Controller",
      description: "Product Description",
      image: "game-controller.jpg",
      price: 99,
      category: "Electronics",
      quantity: 2,
      inventoryStatus: "LOWSTOCK",
      rating: 4,
    },
    {
      id: "1009",
      code: "cm230f032",
      name: "Gaming Set",
      description: "Product Description",
      image: "gaming-set.jpg",
      price: 299,
      category: "Electronics",
      quantity: 63,
      inventoryStatus: "INSTOCK",
      rating: 3,
    },
  ];

  dataGridStaff: Object[] = [];
  dataGridCustomer: Object[] = [];

  cols_cus: any[];
  cols: any[];
  ref: DynamicDialogRef;

  constructor(
    public dialogService: DialogService,
    public messageService: MessageService,
    private serviceStaff: StaffService
  ) {}

  ngOnInit(): void {
    this.getListStaff();
    this.getListCustomer();

    this.cols_cus = [
      { field: "NAME", header: "Name" },
      { field: "USERNAME", header: "Username" },
      { field: "PHONE_NUM", header: "Phone Number" },
      { field: "ADDRESS", header: "Address" },
    ];

    this.cols = [
      { field: "NAME", header: "Name" },
      { field: "USERNAME", header: "Username" },
      { field: "PHONE_NUM", header: "Phone Number" },
      { field: "EMAIL", header: "Email" },
      { field: "COMP_NM", header: "Company" },
    ];
  }

  getListStaff() {
    this.serviceStaff.getAllStaff().subscribe((response) => {
	  this.dataGridStaff = response;
    });
  }

  getListCustomer() {
    this.serviceStaff.getAllCustomer().subscribe((response) => {
      this.dataGridCustomer = response;
    });
  }

  selectedStaff(event, rowData) {
    this.ref = this.dialogService.open(StaffDetailComponent, {
      header: "Employee Information",
      width: "70%",
      contentStyle: { "max-height": "500px", overflow: "auto" },
      baseZIndex: 10000,
      data: {
        CRUD: rowData == null ? "C" : "U",
        USER: rowData ? rowData : null,
      },
    });

    this.ref.onClose.subscribe(() => {
      this.getListStaff();
    });
  }

  selectedCustomer(event, rowData) {
    this.ref = this.dialogService.open(CustomerDetailComponent, {
      header: "Customer Information",
      width: "30%",
      contentStyle: { "max-height": "500px", overflow: "auto" },
      baseZIndex: 10000,
      data: {
        CRUD: rowData == null ? "C" : "U",
        USER: rowData ? rowData : null,
      },
    });

    this.ref.onClose.subscribe(() => {
		this.getListCustomer();
	});
  }
}
