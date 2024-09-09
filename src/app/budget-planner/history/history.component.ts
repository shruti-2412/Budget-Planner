import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideNavComponent } from "../side-nav/side-nav.component";
import { ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [SideNavComponent, ReactiveFormsModule, CommonModule ],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss'
})
export class HistoryComponent {

  history: any;
  selectedMonth: string;
  monthSelected: boolean = false;

  expenses: { month: string, expenseAmount: number }[] = [
    { month: 'January', expenseAmount: 1500 },
    { month: 'February', expenseAmount: 2000 },
    { month: 'March', expenseAmount: 1800 }
  ];

  januaryExpense: any[] = [
    { expenseType: 'Recharge', expenseAmount: 1000 },
    { expenseType: 'Light Bills', expenseAmount: 500 },
  ];
  februaryExpense: any[] = [
    { expenseType: 'Essentials', expenseAmount: 200 },
    { expenseType: 'Light Bills', expenseAmount: 400 }
  ];
  marchExpense: any[] = [
    { expenseType: 'Recharge', expenseAmount: 1100 },
    { expenseType: 'Essentials', expenseAmount: 250 }
  ];

  constructor(
    private fb: FormBuilder, 
    private router: Router) {
    this.selectedMonth = new Date().toLocaleString('default', { month: 'long' });
  }

  ngOnInit(): void {
    this.history = this.fb.group({
      month: ['', Validators.required],
      expenseType: ['', Validators.required],
      expenseAmount: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.history.valid) {
      const newExpense = this.history.value;
      this.getFilteredExpenses().push(newExpense);
      this.history.reset();
    }
  }

  onChange(event: any) {
    this.selectedMonth = event.target.value;
    this.monthSelected = true;
    this.getFilteredExpenses();
  }

  getFilteredExpenses() {
    switch (this.selectedMonth) {
      case 'January':
        return this.januaryExpense;
      case 'February':
        return this.februaryExpense;
      case 'March':
        return this.marchExpense;
      default:
        return [];
    }
  }

  calculateTotalExpense(month: string): number {
    return this.getFilteredExpenses().reduce((acc, curr) => acc + curr.expenseAmount, 0);
  }

  onBack() {
    this.router.navigate(['/budget-planner/dashboard']);
  }

}
