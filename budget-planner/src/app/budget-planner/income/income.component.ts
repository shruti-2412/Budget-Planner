import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-income',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './income.component.html',
  styleUrl: './income.component.scss'
})
export class IncomeComponent {

  incomeForm: any;
  selectedMonth: string;

  januaryIncomes: any[] = [
    { source: 'Salary', amount: 5000, investments: '401(k)' },
    { source: 'Freelancing', amount: 1000, investments: 'Stocks' },
  ];

  februaryIncomes: any[] = [
    { source: 'Salary', amount: 5500, investments: '401(k)' },
    { source: 'Rental Income', amount: 700, investments: 'Real Estate' },
  ];

  marchIncomes: any[] = [
    { source: 'Salary', amount: 5200, investments: '401(k)' },
    { source: 'Freelancing', amount: 1200, investments: 'Stocks' },
    { source: 'Rental Income', amount: 600, investments: 'Real Estate' },
  ];

  constructor(private formbuilder: FormBuilder){
    const currentDate = new Date();
    this.selectedMonth = currentDate.toLocaleString('default', { month: 'long' });
  }

  ngOnInit(){
    this.incomeForm = this.formbuilder.group({
      month:['', Validators.required],
      source:['', Validators.required],
      amount:['', Validators.required],
      investments:['', Validators.required],
    });
  }

  onSubmit(){}

  onChange(event: any){
    this.selectedMonth= event.target.value;
    this.getFilteredData();
  }

  getFilteredData(){
    let filteredIncomes: any[]=[];

    switch(this.selectedMonth){
      case 'January':
        filteredIncomes= [...this.januaryIncomes];
        break;
      case 'February':
        filteredIncomes= [...this.februaryIncomes];
        break;
      case 'March':
        filteredIncomes= [...this.marchIncomes];
        break
      default:
        break;
    }
    return filteredIncomes
  }

  calculateTotalIncome (month: string): number{
    let totalMonthIncome = 0;

    for (let income of this.getIncomeforMonth(month)){
      totalMonthIncome+= income.amount;
    }
    return totalMonthIncome;
  }

  getIncomeforMonth(month: string) :any[]{
    switch(month){
      case 'January':
        return this.januaryIncomes;
      case 'February':
        return this.februaryIncomes;
      case 'March':
        return this.marchIncomes;
      default:
        return [];
    }
  }

}
