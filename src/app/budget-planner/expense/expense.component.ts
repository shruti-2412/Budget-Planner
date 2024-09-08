import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expense',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './expense.component.html',
  styleUrl: './expense.component.scss'
})
export class ExpenseComponent {

  expenseForm: any;
  selectedMonth: string;
  monthSelected: boolean = false;

  expenses: { month: string, expenseAmount: number }[] = [
    { month: 'January', expenseAmount: 1500 },
    { month: 'February', expenseAmount: 2000 },
    { month: 'March', expenseAmount: 1800 }
  ];

  januaryExpense: any[] = [
    { expenseType: 'Rent', expenseAmount: 1000 },
    { expenseType: 'Groceries', expenseAmount: 500},
  ];

  februaryExpense: any[] = [
    { expenseType: 'Utilities', expenseAmount: 200 },
    { expenseType: 'Groceries', expenseAmount: 400 }
  ];

  marchExpense: any[] = [
    { expenseType: 'Rent', expenseAmount: 1100 },
    { expenseType: 'Utilities', expenseAmount: 250 }
  ];

  constructor( private router: Router,
    private formbuilder: FormBuilder,
    private snackBar: MatSnackBar){
    this.selectedMonth = new Date().toLocaleString('default', { month: 'long' });
  }

  ngOnInit(): void {
    this.expenseForm = this.formbuilder.group({
      month: ['', Validators.required],
      expenseType: ['', Validators.required],
      expenseAmount: ['', Validators.required]
    });
  }

  onSubmit(){
    if (this.expenseForm.valid) {
      const newExpense = this.expenseForm.value;
      this.getFilteredExpenses().push(newExpense);
      this.expenseForm.reset();
    }
  }

  onChange(event: any){
    this.selectedMonth= event.target.value;
    this.getFilteredExpenses();
    this.monthSelected= true;
  }

  getFilteredExpenses(){
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

  calculateTotalExpense(month: string): number{
    return this.getFilteredExpenses().reduce((acc, curr) => acc + curr.expenseAmount, 0);
  }

  onBack(){
    this.router.navigate(['/budget-planner/dashboard']);
  }

  onSave(){
    this.snackBar.open('Data saved successfully!', 'Close', { duration: 3000});
  }

}
