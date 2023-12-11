import React from 'react';
import { Line } from 'react-chartjs-2';
import './welcome.css';
import { Button } from 'antd';



export default function welcome() { 

  return (
    <div>
        <h2><b>تعليمات المسؤول</b></h2>
        <h3>1. المدربين</h3>
        <h4>  .قائمة المدربين الحاليين</h4>
        <ul>
          <li>إضافة جديد - إنشاء حساب مدرب جديد.</li>
          <li>فعل - <br/> <p style={{marginBottom:'2px'}}><Button size = 'small' type="primary" shape="circle" icon="edit" /> تحرير تفاصيل المدرب.</p><Button size = 'small' type="primary" shape="circle" icon="delete" /> حذف حساب المدرب.</li>
        </ul>
        <h3>2. جميع الدورات</h3>
        <h4>   قائمة الدورات الموجودة.</h4>
        <ul>
          <li>إضافة جديد - إنشاء دورة جديدة </li>
          <li>فعل - <br/><Button size = 'small' type="primary" shape="circle" icon="edit" /> تحرير اسم الدورة.</li>
        </ul>
        <br/>
        <h2><b>تعليمات المدرب</b></h2>
        <h3>1. كل الأسئلة</h3>
        <h4>   قائمة الأسئلة الموجودة.</h4>
        <ul>
          <li>إضافة جديد - إنشاء سؤال جديد.</li>
          <li>فعل - <br/> <p style={{marginBottom:'2px'}}><Button size = 'small' type="primary" shape="circle" icon="info" />  تفاصيل السؤال. </p><Button size = 'small' type="primary" shape="circle" icon="delete" /> حذف السؤال.</li>
        </ul>
        <h3>2. كل الاختبارات</h3>
        <h4>   قائمة الاختبارات الموجودة</h4>
        <ul>
          <li>فعل - <Button size = 'small' type="primary" shape="circle" icon="info" /> <ul>
            <li>تفاصيل الاختبار</li>
            <li>أسئلة الاختبار</li>
            <li>المتدربون - قائمة المرشحين المسجلين</li>
            <li>إحصائيات - <ul>
              <li>تحميل ملف اكسل من النتائج</li>
              <li>تمثيل رسومي للنتائج</li>
              </ul></li>
            </ul></li>
        </ul>
        <h3>3. اختبارات جديدة</h3>
        <ul>
          <li>إنشاء اختبار جديد</li>
          <ol>
            <li>أدخل تفاصيل الاختبار الأساسية</li>
            <li>حدد الأسئلة</li><ul>
              <li>الأسئلة - عشوائي> أدخل عدد الأسئلة ليتم تحديدها تلقائيًا وانقر فوق "إنشاء ورقة اختبار". انقر فوق "التالي" للمتابعة.</li>
              <li>الأسئلة - يدويًا> تحديد الأسئلة يدويًا. انقر فوق "التالي" للمتابعة.</li>
            </ul>
          </ol>
          <li>معلومات الاختبار الأساسية</li>
          <ul>
            <li>رابط التسجيل - رابط تسجيل المتدرب للاختبار.</li>
            <li>إيقاف التسجيل - انقر لتعطيل ارتباط التسجيل.</li>
            <li>إعادة تحميل - انقر للحصول على قائمة المرشحين المسجلين.</li>
            <li>بدء الاختبار - انقر لبدء الاختبار.</li>
            <li>نهاية الاختبار - انقر لإنهاء الاختبار.</li>
          </ul>
        </ul>

        

    </div>
  );  
}


   