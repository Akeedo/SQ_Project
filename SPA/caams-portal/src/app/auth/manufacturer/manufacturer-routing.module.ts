import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CreateManufacturerComponent } from "./components/create-manufacturer/create-manufacturer.component";
import { ListManufacturerComponent } from "./components/list-manufacturer/list-manufacturer.component";
import { UpdateManufacturerComponent } from "./components/update-manufacturer/update-manufacturer.component";

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: ListManufacturerComponent,
      },
      {
        path: "create-manufacturer",
        component: CreateManufacturerComponent,
      },
      {
        path: "update-manufacturer/:oid",
        component: UpdateManufacturerComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManufacturerRoutingModule {}
