import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import * as XLSX from 'xlsx';
// for allowing jquery
declare var $: any;

@Component({
  selector: 'app-repartition-agent-reporting',
  templateUrl: './repartition-agent-reporting.component.html',
  styleUrls: ['./repartition-agent-reporting.component.css']
})
export class RepartitionAgentReportingComponent implements OnInit {

  searchAgentForm!: FormGroup;
  inputYear!: FormControl;
  inputMonth!: FormControl;
  inputType!: FormControl;
  inputCompany!: FormControl;
  inputCategory!: FormControl;
  selectedCategoryValue!: string;
  selected = 'general';
  /*name of the excel-file which will be downloaded. */
  fileName= 'ExcelSheet.xlsx';

  constructor(private translate: TranslateService, private fb: FormBuilder) {
    translate.setDefaultLang('ar');
  }

  ngOnInit(): void {


    // Initialize Form Controls
    this.inputYear = new FormControl('', [Validators.required]);
    this.inputMonth = new FormControl('', [Validators.required]);
    this.inputType = new FormControl('1', [Validators.required]);
    this.inputCompany = new FormControl('1', [Validators.required]);
    this.inputCategory = new FormControl('general', [Validators.required]);

     // Initialize FormGroup using FormBuilder
    this.searchAgentForm = this.fb.group({
        inputYear : this.inputYear,
        inputMonth : this.inputMonth,
        inputType : this.inputType,
        inputCompany : this.inputCompany,
        inputCategory : this.inputCategory
    });


    $(document).ready(function() {
      // for datepicker
       $('#inputYear').datepicker({
          minViewMode: 'years',
          autoclose: true,
          format: 'yyyy'
       });
       $('#inputMonth').datepicker({
        minViewMode: 1,
        autoclose: true,
        format: 'MM'
       });

    });

  }

  exportToExcel(): void
    {
       /* table id is passed over here */
       let element = document.getElementById('GeneralSelectTable');
       const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
       /* generate workbook and add the worksheet */
       const wb: XLSX.WorkBook = XLSX.utils.book_new();
       XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
       /* save to file */
       XLSX.writeFile(wb, this.fileName);
    }


  onSubmit()
    {
        //getting value of select from controls
        this.selectedCategoryValue = this.searchAgentForm.controls['inputCategory'].value;

        if(this.selectedCategoryValue === 'general') {

          $(document).ready(function() {
             // Create chart
            let SelectSexechart = am4core.create("SelectSexechart", am4charts.PieChart);
            let SelectAgechart = am4core.create("SelectAgechart", am4charts.PieChart);
            // Set data
            SelectSexechart.data = [{
             "الجنس": "الاناث",
             "عدد الاعوان": "35"
            }, {
              "الجنس": "الذكور",
              "عدد الاعوان": "69"
            }];
           // Create series
           let series = SelectSexechart.series.push(new am4charts.PieSeries());
           series.dataFields.value = "عدد الاعوان";
           series.dataFields.category = "الجنس";

            // Set data
            SelectAgechart.data = [{
              "العمر": "60",
              "عدد الاعوان": "12"
            }, {
              "العمر": "35",
              "عدد الاعوان": "5"
            }, {
              "العمر": "41",
              "عدد الاعوان": "2"
           }, {
            "العمر": "38",
            "عدد الاعوان": "2"
           }, {
            "العمر": "52",
            "عدد الاعوان": "3"
           }];
           // Create series
           let series1 = SelectAgechart.series.push(new am4charts.PieSeries());
           series1.dataFields.value = "عدد الاعوان";
           series1.dataFields.category = "العمر";

          });

        } else if(this.selectedCategoryValue === 'grade') {

          $(document).ready(function() {

         });

        } else if(this.selectedCategoryValue === 'secteur') {

        } else if(this.selectedCategoryValue === 'administratif') {

        } else if(this.selectedCategoryValue === 'payeur') {

        } else if(this.selectedCategoryValue === 'institution') {

        } else if(this.selectedCategoryValue === 'carriere') {

        } else {

        }

        console.log(this.searchAgentForm.controls['inputCategory'].value);

    }

}
