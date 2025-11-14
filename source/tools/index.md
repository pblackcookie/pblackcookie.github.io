---
title: 实用工具
date: 2025-11-14 15:51:22
categories:
- JavaScript
tags:
- JavaScript
---
<!-- 工具图标导航区 -->
<div style="text-align: center; margin: 30px 0;">
  <h2>选择工具</h2>
  <div style="display: flex; justify-content: center; gap: 30px; flex-wrap: wrap; margin-top: 20px;">
    <!-- 计算器图标 -->
    <div class="tool-icon" data-target="calculator" style="cursor: pointer; text-align: center;">
      <i class="fa fa-calculator" style="font-size: 40px; color: #4285f4;"></i>
      <p style="margin-top: 10px;">计算器</p>
    </div>
    <!-- 在现有图标导航区添加五险一金图标 -->
    <div class="tool-icon" data-target="insurance" style="cursor: pointer; text-align: center;">
      <i class="fa fa-credit-card" style="font-size: 40px; color: #000000;"></i>
      <p style="margin-top: 10px;">五险一金计算</p>
    </div>
  </div>
</div>

<!-- 工具内容区域（默认隐藏） -->
<div class="tool-content" id="calculator" style="display: none; max-width: 400px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
  <h3 style="text-align: center;">简易计算器</h3>
  <!-- 计算器HTML代码（和之前的一致） -->
  <input type="text" id="calcDisplay" style="width: 94%; padding: 10px; margin-bottom: 10px; font-size: 18px; text-align: right;" readonly>
  <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px;">
    <button onclick="clearDisplay()" style="padding: 12px; font-size: 16px;">C</button>
    <button onclick="appendChar('/')" style="padding: 12px; font-size: 16px;">÷</button>
    <button onclick="appendChar('*')" style="padding: 12px; font-size: 16px;">×</button>
    <button onclick="appendChar('-')" style="padding: 12px; font-size: 16px;">-</button>
    <button onclick="appendChar('7')" style="padding: 12px; font-size: 16px;">7</button>
    <button onclick="appendChar('8')" style="padding: 12px; font-size: 16px;">8</button>
    <button onclick="appendChar('9')" style="padding: 12px; font-size: 16px;">9</button>
    <button onclick="appendChar('+')" style="padding: 12px; font-size: 16px;">+</button>
    <button onclick="appendChar('4')" style="padding: 12px; font-size: 16px;">4</button>
    <button onclick="appendChar('5')" style="padding: 12px; font-size: 16px;">5</button>
    <button onclick="appendChar('6')" style="padding: 12px; font-size: 16px;">6</button>
    <button onclick="calculate()" style="padding: 12px; font-size: 16px; grid-row: span 3; background: #4285f4; color: white;">=</button>
    <button onclick="appendChar('1')" style="padding: 12px; font-size: 16px;">1</button>
    <button onclick="appendChar('2')" style="padding: 12px; font-size: 16px;">2</button>
    <button onclick="appendChar('3')" style="padding: 12px; font-size: 16px;">3</button>
    <button onclick="appendChar('0')" style="padding: 12px; font-size: 16px; grid-column: span 2;">0</button>
    <button onclick="appendChar('.')" style="padding: 12px; font-size: 16px;">.</button>
  </div>
</div>

<!-- 五险一金计算器内容区（添加在其他工具内容之后） -->
<div class="tool-content" id="insurance" style="display: none; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
  <h3 style="text-align: center;">五险一金计算器</h3>

  <!-- 输入参数区域 -->
  <div style="margin-bottom: 20px;">
    <div style="margin: 10px 0;">
      <label style="display: inline-block; width: 220px;">税前工资（元）：</label>
      <input type="number" id="salary" value="5000" min="0" style="width: 200px; padding: 6px;">
    </div>
<div style="margin: 10px 0;">
      <label style="display: inline-block; width: 220px;">五险一金缴纳工资（元）：</label>
      <input type="number" id="actual_salary" value="5000" min="0" style="width: 200px; padding: 6px;">
    </div>
    <div style="margin: 10px 0;">
      <label style="display: inline-block; width: 220px;">公积金个人比例：</label>
      <input type="number" id="fundPersonalRate" value="12" min="5" max="12" step="0.5" style="width: 80px; padding: 6px;">
      <span>%</span>
    </div>
    <div style="margin: 10px 0;">
      <label style="display: inline-block; width: 220px;">公积金单位比例：</label>
      <input type="number" id="fundCompanyRate" value="12" min="5" max="12" step="0.5" style="width: 80px; padding: 6px;">
      <span>%</span>
    </div>
    <button onclick="calculateInsurance()" style="margin-top: 10px; padding: 8px 16px; background: #4285f4; color: white; border: none; border-radius: 4px; cursor: pointer;">
      计算
    </button>
  </div>

  <!-- 计算结果区域 -->
  <div id="insuranceResult" style="margin-top: 20px; padding: 15px; background: #f5f5f5; border-radius: 4px;">
    <h4 style="margin-top: 0; text-align: center;">计算结果</h4>
    <table style="width: 100%; border-collapse: collapse;">
      <tr style="border-bottom: 1px solid #ddd;">
        <td style="padding: 8px;">个人缴纳总额：</td>
        <td style="padding: 8px; text-align: right;" id="personalTotal">--</td>
      </tr>
      <tr style="border-bottom: 1px solid #ddd;">
        <td style="padding: 8px;">单位缴纳总额：</td>
        <td style="padding: 8px; text-align: right;" id="companyTotal">--</td>
      </tr>
      <tr style="border-bottom: 1px solid #ddd;">
        <td style="padding: 8px;">五险一金总计：</td>
        <td style="padding: 8px; text-align: right;" id="total">--</td>
      </tr>
        <tr>
        <td style="padding: 8px;">本月个人缴税：</td>
        <td style="padding: 8px; text-align: right;" id="tax">--</td>
      </tr>
      <tr>
        <td style="padding: 8px;">税后参考工资：</td>
        <td style="padding: 8px; text-align: right;" id="afterTax">--</td>
      </tr>
    </table>
    <!-- 明细折叠面板 -->
    <details style="margin-top: 15px; cursor: pointer;">
      <summary style="color: #4285f4;">查看明细</summary>
      <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
        <tr style="background: #eee;">
          <th style="padding: 6px; text-align: left;">项目</th>
          <th style="padding: 6px; text-align: right;">个人缴纳</th>
          <th style="padding: 6px; text-align: right;">单位缴纳</th>
        </tr>
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 6px;">养老保险</td>
          <td style="padding: 6px; text-align: right;" id="pensionPersonal">--</td>
          <td style="padding: 6px; text-align: right;" id="pensionCompany">--</td>
        </tr>
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 6px;">医疗保险</td>
          <td style="padding: 6px; text-align: right;" id="medicalPersonal">--</td>
          <td style="padding: 6px; text-align: right;" id="medicalCompany">--</td>
        </tr>
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 6px;">失业保险</td>
          <td style="padding: 6px; text-align: right;" id="unemploymentPersonal">--</td>
          <td style="padding: 6px; text-align: right;" id="unemploymentCompany">--</td>
        </tr>
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 6px;">工伤保险</td>
          <td style="padding: 6px; text-align: right;">0元</td>
          <td style="padding: 6px; text-align: right;" id="injuryCompany">--</td>
        </tr>
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 6px;">生育保险</td>
          <td style="padding: 6px; text-align: right;">0元</td>
          <td style="padding: 6px; text-align: right;" id="maternityCompany">--</td>
        </tr>
        <tr>
          <td style="padding: 6px;">住房公积金</td>
          <td style="padding: 6px; text-align: right;" id="fundPersonal">--</td>
          <td style="padding: 6px; text-align: right;" id="fundCompany">--</td>
        </tr>
      </table>
    </details>
  </div>
</div>

<!-- 交互逻辑JS -->
<script>
  // 1. 图标点击事件：显示对应的工具内容
  document.querySelectorAll('.tool-icon').forEach(icon => {
    icon.addEventListener('click', function() {
      // 获取目标工具ID（如 calculator、calendar）
      const targetId = this.getAttribute('data-target');
      
      // 隐藏所有工具内容
      document.querySelectorAll('.tool-content').forEach(content => {
        content.style.display = 'none';
      });
      
      // 显示当前点击的工具内容
      document.getElementById(targetId).style.display = 'block';
      
      // 可选：点击后滚动到工具内容区域
      document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
    });
  });

  // 2. 计算器逻辑（和之前的一致）
  const display = document.getElementById('calcDisplay');
  function appendChar(char) { display.value += char; }
  function clearDisplay() { display.value = ''; }
  function calculate() {
    try {
      const expression = display.value.replace('×', '*').replace('÷', '/');
      display.value = eval(expression);
    } catch (error) {
      display.value = '错误';
    }
  }
  // 3. 五险一金计算逻辑（按常见比例，可根据实际调整）
  function calculateInsurance() {
    // 获取输入值
    const salary = parseFloat(document.getElementById('salary').value) || 0;
    const actual_salary = parseFloat(document.getElementById('actual_salary').value) || 0;
    const fundPersonalRate = parseFloat(document.getElementById('fundPersonalRate').value) / 100 || 0;
    const fundCompanyRate = parseFloat(document.getElementById('fundCompanyRate').value) / 100 || 0;
    
    // 五险一金比例（全国通用参考值，单位%）
    const rates = {
      pension: { personal: 8, company: 16 },        // 养老保险
      medical: { personal: 2, company: 8 },         // 医疗保险（含大病统筹）
      unemployment: { personal: 0.5, company: 0.5 }, // 失业保险
      injury: { company: 0.5 },                      // 工伤保险（个人不缴）
      maternity: { company: 0.8 }                    // 生育保险（个人不缴）
    };
    
    // 计算各项目金额
    const pensionPersonal = actual_salary * rates.pension.personal / 100;
    const pensionCompany = actual_salary * rates.pension.company / 100;
    
    const medicalPersonal = actual_salary * rates.medical.personal / 100;
    const medicalCompany = actual_salary * rates.medical.company / 100;
    
    const unemploymentPersonal = actual_salary * rates.unemployment.personal / 100;
    const unemploymentCompany = actual_salary * rates.unemployment.company / 100;
    
    const injuryCompany = actual_salary * rates.injury.company / 100;
    const maternityCompany = actual_salary * rates.maternity.company / 100;
    
    const fundPersonal = actual_salary * fundPersonalRate;
    const fundCompany = actual_salary * fundCompanyRate;
    
    // 汇总
    const personalTotal = pensionPersonal + medicalPersonal + unemploymentPersonal + fundPersonal;
    const companyTotal = pensionCompany + medicalCompany + unemploymentCompany + injuryCompany + maternityCompany + fundCompany;
    const total = personalTotal + companyTotal;
    
    // 计算税后参考工资（简化版：扣除个人缴纳部分后计税）
    const taxableIncome = salary - personalTotal - 5000; // 5000为起征点
    const tax = taxableIncome > 0 ? Math.max(0, taxableIncome * 0.03) : 0; // 简化按3%税率
    const afterTax = salary - personalTotal - tax;
    
    // 更新页面显示（保留两位小数）
    document.getElementById('pensionPersonal').textContent = pensionPersonal.toFixed(2) + '元';
    document.getElementById('pensionCompany').textContent = pensionCompany.toFixed(2) + '元';
    
    document.getElementById('medicalPersonal').textContent = medicalPersonal.toFixed(2) + '元';
    document.getElementById('medicalCompany').textContent = medicalCompany.toFixed(2) + '元';
    
    document.getElementById('unemploymentPersonal').textContent = unemploymentPersonal.toFixed(2) + '元';
    document.getElementById('unemploymentCompany').textContent = unemploymentCompany.toFixed(2) + '元';
    
    document.getElementById('injuryCompany').textContent = injuryCompany.toFixed(2) + '元';
    document.getElementById('maternityCompany').textContent = maternityCompany.toFixed(2) + '元';
    
    document.getElementById('fundPersonal').textContent = fundPersonal.toFixed(2) + '元';
    document.getElementById('fundCompany').textContent = fundCompany.toFixed(2) + '元';
    
    document.getElementById('personalTotal').textContent = personalTotal.toFixed(2) + '元';
    document.getElementById('companyTotal').textContent = companyTotal.toFixed(2) + '元';
    document.getElementById('total').textContent = total.toFixed(2) + '元';
    document.getElementById('tax').textContent = tax.toFixed(2) + '元';
    document.getElementById('afterTax').textContent = afterTax.toFixed(2) + '元';
  }

</script>