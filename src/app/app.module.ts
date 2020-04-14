import { BrowserModule    } from '@angular/platform-browser';
import { NgModule         } from '@angular/core';
import { FormsModule      } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule   } from './app-routing.module';
import { AppComponent       } from './app.component';
import { NavComponent       } from './nav/nav.component';
import { ContentComponent   } from './content/content.component';
import { FooterComponent    } from './footer/footer.component';
import { HomeComponent      } from './home/home.component';
import { EmployeesComponent } from './employees/employees.component';
import { PositionsComponent } from './positions/positions.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PositionService       } from './position.service';
import { EmployeeService       } from './employee.service';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { PositionDetailComponent } from './position-detail/position-detail.component';

// Material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule          } from '@angular/material/table';
import { MatSortModule           } from '@angular/material';
import { MatFormFieldModule, MatInputModule } from '@angular/material'; 
import { MatIconModule           } from '@angular/material/icon'; 
import { MatButtonModule         } from '@angular/material/button'; 
import { MatPaginatorModule      } from '@angular/material/paginator';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    ContentComponent,
    FooterComponent,
    HomeComponent,
    EmployeesComponent,
    PositionsComponent,
    PageNotFoundComponent,
    EmployeeDetailComponent,
    PositionDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule
  ],
  providers: [PositionService, EmployeeService],
  bootstrap: [AppComponent],
  exports: [
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule
  ]
})
export class AppModule { }
