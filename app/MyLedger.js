'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  CreditCard,
  ShoppingCart,
  Plane,
  Calendar,
  Home,
  Plus,
  Edit2,
  Trash2,
  Check,
  Bell,
  DollarSign,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  X,
  Save,
  Package,
  Settings,
  Download,
  Upload,
  ChevronDown,
  Clock,
} from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';

const SakuraPetal = ({ style }) => (
  <svg
    style={style}
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="10" cy="10" r="8" fill="rgba(244,143,177,0.1)" />
    <path
      d="M10 2C10 2 13 8 10 11C7 8 10 2 10 2Z"
      fill="rgba(244,143,177,0.15)"
    />
    <path
      d="M10 2C10 2 7 8 10 11C13 8 10 2 10 2Z"
      fill="rgba(244,143,177,0.12)"
    />
    <path
      d="M2 10C2 10 8 13 11 10C8 7 2 10 2 10Z"
      fill="rgba(206,147,216,0.1)"
    />
  </svg>
);

const MyLedger = () => {
  const [exchangeRate, setExchangeRate] = useState(57);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentDate, setCurrentDate] = useState(new Date());

  // Sakura petals positions
  const sakuraPetals = useMemo(() => {
    return Array.from({ length: 18 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 5,
      size: 15 + Math.random() * 15,
      opacity: 0.05 + Math.random() * 0.1,
      duration: 20 + Math.random() * 10,
    }));
  }, []);

  // Real-time clock
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Initial credit cards state
  const [creditCards, setCreditCards] = useState(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('creditCards') : null;
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 'union-rewards',
            name: 'Union Bank Rewards Platinum',
            balance: 0,
            rate: 3,
            minPayment: 0,
            statementDay: 6,
            daysTodue: 17,
            interestPerMonth: 0,
            limit: 45000,
            paymentHistory: [],
          },
          {
            id: 'union-cebu',
            name: 'Union Bank Cebu Pacific Platinum',
            balance: 93989.4,
            rate: 3,
            minPayment: 4699.47,
            statementDay: 10,
            daysTodue: 21,
            interestPerMonth: 2819.68,
            limit: 152000,
            paymentHistory: [],
          },
          {
            id: 'bpi-gold',
            name: 'BPI Gold Rewards Card',
            balance: 40177.43,
            rate: 3,
            minPayment: 2008.87,
            statementDay: 15,
            daysTodue: 21,
            interestPerMonth: 1205.32,
            limit: 136000,
            paymentHistory: [],
          },
          {
            id: 'security-wave',
            name: 'Security Bank Wave Card',
            balance: 66961.88,
            rate: 2.5,
            minPayment: 3348.09,
            statementDay: 12,
            daysTodue: 25,
            interestPerMonth: 1674.05,
            limit: 70000,
            paymentHistory: [],
          },
          {
            id: 'eastwest-jcb',
            name: 'East West JCB Gold',
            balance: 116900.35,
            rate: 3,
            minPayment: 5845.02,
            statementDay: 10,
            daysTodue: 20,
            interestPerMonth: 3507.01,
            limit: 145000,
            paymentHistory: [],
          },
          {
            id: 'rcbc-gold',
            name: 'RCBC Gold Flex',
            balance: 62290.36,
            rate: 3,
            minPayment: 3114.52,
            statementDay: 3,
            daysTodue: 58,
            interestPerMonth: 1868.71,
            limit: 73000,
            paymentHistory: [],
          },
          {
            id: 'atome',
            name: 'Atome (Virtual/Inactive)',
            balance: 0,
            rate: 0,
            minPayment: 0,
            statementDay: 18,
            daysTodue: 10,
            interestPerMonth: 0,
            limit: 81000,
            paymentHistory: [],
          },
          {
            id: 'shopee',
            name: 'Shopee SpayLater',
            balance: 0,
            rate: 0,
            minPayment: 0,
            statementDay: 25,
            daysTodue: 10,
            interestPerMonth: 0,
            limit: 75000,
            paymentHistory: [],
          },
        ];
  });

  // Savings accounts state
  const [savingsAccounts, setSavingsAccounts] = useState(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('savingsAccounts') : null;
    return saved
      ? JSON.parse(saved)
      : [
          { id: 'bpi-savings', name: 'BPI Savings', balance: 0 },
          { id: 'rcbc-savings', name: 'RCBC Savings', balance: 0 },
          { id: 'unionbank-savings', name: 'UnionBank Savings', balance: 0 },
        ];
  });

  // Grocery items state with days frequency
  const [groceryItems, setGroceryItems] = useState(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('groceryItems') : null;
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 'vitd3k2',
            category: 'VITAMINS',
            name: 'Vitamin D3 & K2',
            price: 975,
            frequencyDays: 30,
            lastPurchased: null,
            card: 'bpi-gold',
          },
          {
            id: 'metthioni',
            category: 'VITAMINS',
            name: 'Met Thatione',
            price: 2017,
            frequencyDays: 30,
            lastPurchased: null,
            card: 'bpi-gold',
          },
          {
            id: 'cranberry',
            category: 'VITAMINS',
            name: 'Cranberry',
            price: 1297,
            frequencyDays: 60,
            lastPurchased: null,
            card: 'bpi-gold',
          },
          {
            id: 'vitamc',
            category: 'VITAMINS',
            name: 'Vitamin C',
            price: 280.9,
            frequencyDays: 30,
            lastPurchased: null,
            card: 'bpi-gold',
          },
          {
            id: 'vitame',
            category: 'VITAMINS',
            name: 'Vitamin E',
            price: 280.9,
            frequencyDays: 60,
            lastPurchased: null,
            card: 'bpi-gold',
          },
          {
            id: 'magpure',
            category: 'VITAMINS',
            name: 'Magnesium Pure',
            price: 1537,
            frequencyDays: 45,
            lastPurchased: null,
            card: 'bpi-gold',
          },
          {
            id: 'tonercele',
            category: 'SKINCARE',
            name: 'Toner Celeteque',
            price: 194,
            frequencyDays: 90,
            lastPurchased: null,
            card: 'bpi-gold',
          },
          {
            id: 'keanarice',
            category: 'SKINCARE',
            name: 'Keana Rice Pack',
            price: 468.17,
            frequencyDays: 60,
            lastPurchased: null,
            card: 'bpi-gold',
          },
          {
            id: 'keanaface',
            category: 'SKINCARE',
            name: 'Keana Rice Face Wash',
            price: 280.9,
            frequencyDays: 60,
            lastPurchased: null,
            card: 'bpi-gold',
          },
          {
            id: 'melanocc',
            category: 'SKINCARE',
            name: 'Melano CC',
            price: 329.59,
            frequencyDays: 365,
            lastPurchased: null,
            card: 'bpi-gold',
          },
          {
            id: 'hadalabo',
            category: 'SKINCARE',
            name: 'Hada Labo',
            price: 370.79,
            frequencyDays: 365,
            lastPurchased: null,
            card: 'bpi-gold',
          },
          {
            id: '345cream',
            category: 'SKINCARE',
            name: '345 Cream',
            price: 1050,
            frequencyDays: 90,
            lastPurchased: null,
            card: 'bpi-gold',
          },
          {
            id: 'shampoo',
            category: 'TOILETRIES',
            name: 'Shampoo',
            price: 130.34,
            frequencyDays: 90,
            lastPurchased: null,
            card: 'bpi-gold',
          },
          {
            id: 'deo',
            category: 'TOILETRIES',
            name: 'Deo',
            price: 178,
            frequencyDays: 90,
            lastPurchased: null,
            card: 'bpi-gold',
          },
          {
            id: 'toothpaste',
            category: 'TOILETRIES',
            name: 'Toothpaste',
            price: 215,
            frequencyDays: 120,
            lastPurchased: null,
            card: 'bpi-gold',
          },
          {
            id: 'conditioner',
            category: 'TOILETRIES',
            name: 'Conditioner',
            price: 130.34,
            frequencyDays: 90,
            lastPurchased: null,
            card: 'bpi-gold',
          },
          {
            id: 'lactacyd',
            category: 'TOILETRIES',
            name: 'Lactacyd',
            price: 542,
            frequencyDays: 180,
            lastPurchased: null,
            card: 'bpi-gold',
          },
          {
            id: 'safeguard',
            category: 'TOILETRIES',
            name: 'Safeguard',
            price: 488,
            frequencyDays: 180,
            lastPurchased: null,
            card: 'bpi-gold',
          },
          {
            id: 'milksoap',
            category: 'TOILETRIES',
            name: 'Milk Soap',
            price: 179.03,
            frequencyDays: 180,
            lastPurchased: null,
            card: 'bpi-gold',
          },
          {
            id: 'cottonbuds',
            category: 'TOILETRIES',
            name: 'Cotton Buds',
            price: 95,
            frequencyDays: 90,
            lastPurchased: null,
            card: 'bpi-gold',
          },
          {
            id: 'cottonpads',
            category: 'TOILETRIES',
            name: 'Cotton Pads',
            price: 99,
            frequencyDays: 90,
            lastPurchased: null,
            card: 'bpi-gold',
          },
          {
            id: 'toothbrush',
            category: 'TOILETRIES',
            name: 'Tooth Brush',
            price: 974,
            frequencyDays: 90,
            lastPurchased: null,
            card: 'bpi-gold',
          },
          {
            id: 'napkin',
            category: 'TOILETRIES',
            name: 'Napkin',
            price: 535,
            frequencyDays: 90,
            lastPurchased: null,
            card: 'bpi-gold',
          },
          {
            id: 'dashing',
            category: 'TOILETRIES',
            name: 'Dashing',
            price: 800,
            frequencyDays: 30,
            lastPurchased: null,
            card: 'bpi-gold',
          },
          {
            id: 'haircut',
            category: 'TOILETRIES',
            name: 'Haircut',
            price: 800,
            frequencyDays: 365,
            lastPurchased: null,
            card: 'bpi-gold',
          },
          {
            id: 'handwash',
            category: 'TOILETRIES',
            name: 'Hand Wash',
            price: 107.87,
            frequencyDays: 180,
            lastPurchased: null,
            card: 'bpi-gold',
          },
          {
            id: 'ariel-liquid',
            category: 'HOUSEHOLD',
            name: 'Ariel Liquid 4-pack',
            price: 1811,
            frequencyDays: 30,
            lastPurchased: null,
            card: 'bpi-gold',
          },
          {
            id: 'ariel-powder',
            category: 'HOUSEHOLD',
            name: 'Ariel Powder',
            price: 561,
            frequencyDays: 30,
            lastPurchased: null,
            card: 'bpi-gold',
          },
          {
            id: 'downy',
            category: 'HOUSEHOLD',
            name: 'Downy 2-pack',
            price: 838,
            frequencyDays: 30,
            lastPurchased: null,
            card: 'bpi-gold',
          },
          {
            id: 'zonrox',
            category: 'HOUSEHOLD',
            name: 'Zonrox',
            price: 283,
            frequencyDays: 30,
            lastPurchased: null,
            card: 'bpi-gold',
          },
          {
            id: 'albatross',
            category: 'HOUSEHOLD',
            name: 'Albatross',
            price: 192,
            frequencyDays: 30,
            lastPurchased: null,
            card: 'bpi-gold',
          },
        ];
  });

  // Purchases state
  const [purchases, setPurchases] = useState(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('purchases') : null;
    return saved ? JSON.parse(saved) : [];
  });

  // Travel trips state
  const [trips, setTrips] = useState(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('trips') : null;
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 'shanghai-2026',
            name: 'Shanghai Trip',
            destination: 'Shanghai, China',
            startDate: '2026-06-15',
            endDate: '2026-06-22',
            notes: 'Summer vacation trip',
            expenses: [],
          },
        ];
  });

  // Subscriptions state
  const [subscriptions, setSubscriptions] = useState(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('subscriptions') : null;
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 'hbo-max',
            name: 'HBO Max',
            amount: 199,
            day: 27,
            card: 'security-wave',
            status: 'Active',
          },
          {
            id: 'canva',
            name: 'Canva',
            amount: 299,
            day: 27,
            card: 'security-wave',
            status: 'Active',
          },
          {
            id: 'appletv',
            name: 'Apple TV+',
            amount: 607.99,
            day: 1,
            card: 'security-wave',
            status: 'Active',
          },
          {
            id: 'netflix',
            name: 'Netflix',
            amount: 625.19,
            day: 5,
            card: 'bpi-gold',
            status: 'Active',
          },
          {
            id: 'spotify',
            name: 'Spotify',
            amount: 281.79,
            day: 8,
            card: 'bpi-gold',
            status: 'Active',
          },
          {
            id: 'google-one',
            name: 'Google One',
            amount: 604.99,
            day: 21,
            card: 'bpi-gold',
            status: 'Active',
          },
        ];
  });

  // Fixed bills state
  const [fixedBills, setFixedBills] = useState(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('fixedBills') : null;
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 'prulife',
            name: 'PruLife Insurance',
            amount: 3000,
            day: 15,
            status: 'Active',
          },
          {
            id: 'globe-plan',
            name: 'Globe Phone Plan',
            amount: 4893.84,
            day: 7,
            status: 'Active',
          },
        ];
  });

  // Installments state
  const [installments, setInstallments] = useState(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('installments') : null;
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 'dryer',
            name: 'Dryer',
            totalAmount: 25000,
            monthlyPayment: 1041.67,
            months: 24,
            startDate: '2025-06-14',
            card: 'bpi-gold',
            remainingBalance: 15625,
            paid: false,
          },
          {
            id: 'macmini',
            name: 'Mac Mini',
            totalAmount: 38469,
            monthlyPayment: 1602.88,
            months: 24,
            startDate: '2025-05-23',
            card: 'bpi-gold',
            remainingBalance: 22440.25,
            paid: false,
          },
          {
            id: 'samsung',
            name: 'Samsung',
            totalAmount: 47513,
            monthlyPayment: 1979.71,
            months: 24,
            startDate: '2025-12-12',
            card: 'bpi-gold',
            remainingBalance: 41573.88,
            paid: false,
          },
          {
            id: 'fiance-phone',
            name: "Fiancé's Phone",
            totalAmount: 24990,
            monthlyPayment: 1041.25,
            months: 24,
            startDate: '2025-03-14',
            card: 'bpi-gold',
            remainingBalance: 12495,
            paid: false,
            shareAmount: 0,
          },
          {
            id: 'christmas-gifts',
            name: 'Christmas Gifts',
            totalAmount: 2838.49,
            monthlyPayment: 946.16,
            months: 3,
            startDate: '2025-12-01',
            card: 'shopee',
            remainingBalance: 0,
            paid: true,
          },
          {
            id: 'draltea345',
            name: 'Dr. Althea 345',
            totalAmount: 1028.32,
            monthlyPayment: 342.77,
            months: 3,
            startDate: '2026-03-01',
            card: 'shopee',
            remainingBalance: 0,
            paid: true,
          },
          {
            id: 'roomlight',
            name: 'Room Light',
            totalAmount: 1740.22,
            monthlyPayment: 580.07,
            months: 3,
            startDate: '2026-03-01',
            card: 'shopee',
            remainingBalance: 0,
            paid: true,
          },
          {
            id: 'detailmakeup',
            name: 'Detail Make Up',
            totalAmount: 1001.73,
            monthlyPayment: 333.91,
            months: 3,
            startDate: '2026-03-01',
            card: 'shopee',
            remainingBalance: 0,
            paid: true,
          },
          {
            id: 'icemaker',
            name: 'Ice Maker',
            totalAmount: 3889,
            monthlyPayment: 1296.33,
            months: 3,
            startDate: '2026-03-01',
            card: 'shopee',
            remainingBalance: 0,
            paid: true,
          },
        ];
  });

  // Income tracking by month
  const [monthlyIncome, setMonthlyIncome] = useState(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('monthlyIncome') : null;
    return saved ? JSON.parse(saved) : {};
  });

  // Calendar state
  const [calendarMonth, setCalendarMonth] = useState(new Date().getMonth());
  const [calendarYear, setCalendarYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDateEvents, setSelectedDateEvents] = useState([]);

  // Save to localStorage whenever state changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('creditCards', JSON.stringify(creditCards));
    }
  }, [creditCards]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('savingsAccounts', JSON.stringify(savingsAccounts));
    }
  }, [savingsAccounts]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('groceryItems', JSON.stringify(groceryItems));
    }
  }, [groceryItems]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('purchases', JSON.stringify(purchases));
    }
  }, [purchases]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('trips', JSON.stringify(trips));
    }
  }, [trips]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('subscriptions', JSON.stringify(subscriptions));
    }
  }, [subscriptions]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('fixedBills', JSON.stringify(fixedBills));
    }
  }, [fixedBills]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('installments', JSON.stringify(installments));
    }
  }, [installments]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('monthlyIncome', JSON.stringify(monthlyIncome));
    }
  }, [monthlyIncome]);

  // Calculate suggested payments using avalanche method
  const calculateSuggestedPayments = useCallback(() => {
    const totalMonthlyIncome = 200000; // Forecast base
    const totalFixedBills = fixedBills.reduce((sum, bill) => sum + bill.amount, 0);
    const totalSubscriptions = subscriptions.reduce(
      (sum, sub) => sum + (sub.status === 'Active' ? sub.amount : 0),
      0
    );
    const totalMinPayments = creditCards.reduce((sum, card) => sum + card.minPayment, 0);

    const availableForDebt = totalMonthlyIncome - totalFixedBills - totalSubscriptions;

    const sorted = [...creditCards]
      .filter((card) => card.balance > 0)
      .sort((a, b) => b.rate - a.rate);

    const suggested = {};
    sorted.forEach((card) => {
      suggested[card.id] = card.minPayment;
    });

    if (availableForDebt > 0 && sorted.length > 0) {
      const extra = availableForDebt - totalMinPayments;
      if (extra > 0 && sorted[0]) {
        suggested[sorted[0].id] = card.minPayment + extra;
      }
    }

    return suggested;
  }, [creditCards, fixedBills, subscriptions]);

  // Get payment day dates for the month
  const getPayDayDates = useCallback((month, year) => {
    const dates = [];
    const lastPaid = new Date(2026, 2, 27); // March 27, 2026
    const current = new Date(year, month, 1);

    let payDate = new Date(lastPaid);
    while (payDate.getFullYear() < year || (payDate.getFullYear() === year && payDate.getMonth() < month)) {
      payDate = new Date(payDate.getTime() + 14 * 24 * 60 * 60 * 1000);
    }

    while (payDate.getMonth() === month && payDate.getFullYear() === year) {
      dates.push(payDate.getDate());
      payDate = new Date(payDate.getTime() + 14 * 24 * 60 * 60 * 1000);
    }

    return dates;
  }, []);

  // Get Archy invoice payment dates
  const getArchyPayDates = useCallback((month, year) => {
    const dates = [];
    const invoiceDay = 1;
    const paymentDay = 7; // ~5 business days

    if (month === new Date().getMonth() && year === new Date().getFullYear()) {
      dates.push(paymentDay);
    }

    return [paymentDay];
  }, []);

  // Handle date click in calendar
  const handleDateClick = (day) => {
    setSelectedDate(day);
    const events = [];
    const dateStr = `${calendarYear}-${String(calendarMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

    // Check for pay days
    const payDays = getPayDayDates(calendarMonth, calendarYear);
    if (payDays.includes(day)) {
      events.push({
        type: 'payday',
        title: 'Mole Street Pay Day',
        description: 'Biweekly salary deposit',
        color: 'green',
      });
    }

    // Check for Archy payment
    if (day === 7) {
      events.push({
        type: 'archy',
        title: 'Archy Payment Received',
        description: 'Invoice payment (~5 business days after 1st)',
        color: 'green',
      });
    }

    // Check for subscriptions
    subscriptions.forEach((sub) => {
      if (sub.day === day && sub.status === 'Active') {
        events.push({
          type: 'subscription',
          title: `${sub.name} - ₱${sub.amount}`,
          description: 'Subscription charge',
          color: 'blue',
        });
      }
    });

    // Check for fixed bills
    fixedBills.forEach((bill) => {
      if (bill.day === day) {
        events.push({
          type: 'bill',
          title: `${bill.name} - ₱${bill.amount}`,
          description: 'Fixed bill',
          color: 'red',
        });
      }
    });

    // Check for statement dates
    creditCards.forEach((card) => {
      if (card.statementDay === day) {
        events.push({
          type: 'statement',
          title: `${card.name} Statement`,
          description: 'Credit card statement',
          color: 'orange',
        });
      }
    });

    // Check for trip dates
    trips.forEach((trip) => {
      const tripStart = new Date(trip.startDate);
      const tripEnd = new Date(trip.endDate);
      const checkDate = new Date(calendarYear, calendarMonth, day);

      if (checkDate >= tripStart && checkDate <= tripEnd) {
        events.push({
          type: 'travel',
          title: trip.name,
          description: `${trip.destination}`,
          color: 'teal',
        });
      }
    });

    // Check for grocery dates (quarterly)
    const months = [2, 5, 8, 11]; // March, June, September, December
    if (months.includes(calendarMonth) && day === 30) {
      events.push({
        type: 'grocery',
        title: 'Quarterly Grocery Purchase',
        description: '₱15,000-16,000',
        color: 'pink',
      });
    }

    setSelectedDateEvents(events);
  };

  // Calculate card forecast
  const calculateCardForecast = (card, forecastDate) => {
    const daysUntilStatement = calculateDaysUntil(new Date(), card.statementDay);
    const dailyInterest = (card.balance * (card.rate / 100)) / 30;
    const forecastedBalance = card.balance + dailyInterest * daysUntilStatement;
    return Math.max(0, forecastedBalance);
  };

  const calculateDaysUntil = (from, dayOfMonth) => {
    const today = new Date(from);
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const currentDay = today.getDate();

    if (dayOfMonth >= currentDay) {
      return dayOfMonth - currentDay;
    } else {
      const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
      return daysInMonth - currentDay + dayOfMonth;
    }
  };

  // Dashboard Tab
  const DashboardTab = () => {
    const totalDebt = creditCards.reduce((sum, card) => sum + card.balance, 0);
    const totalLimit = creditCards.reduce((sum, card) => sum + card.limit, 0);
    const totalSavings = savingsAccounts.reduce((sum, acc) => sum + acc.balance, 0);
    const utilizationRate = (totalDebt / totalLimit) * 100;

    const monthlySubscriptionTotal = subscriptions.reduce(
      (sum, sub) => sum + (sub.status === 'Active' ? sub.amount : 0),
      0
    );
    const monthlyBillsTotal = fixedBills.reduce((sum, bill) => sum + bill.amount, 0);
    const monthlyInstallments = installments.reduce((sum, inst) => sum + inst.monthlyPayment, 0);
    const totalMonthlyObligations = monthlySubscriptionTotal + monthlyBillsTotal + monthlyInstallments;

    return (
      <div className="space-y-6">
        {/* Real-time Clock */}
        <div className="bg-gradient-to-r from-pink-100 to-blue-100 rounded-lg p-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Clock className="text-pink-600" />
            <span className="text-sm text-gray-600">Current Time</span>
          </div>
          <div className="text-4xl font-bold text-gray-800">
            {currentDate.toLocaleTimeString('en-PH')}
          </div>
          <div className="text-lg text-gray-700 mt-2">
            {currentDate.toLocaleDateString('en-PH', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Total Debt Card */}
          <div className="bg-gradient-to-br from-red-100 to-pink-100 rounded-lg p-6 shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Total Debt</h3>
              <TrendingDown className="text-red-600" />
            </div>
            <p className="text-3xl font-bold text-red-700">₱{totalDebt.toLocaleString('en-PH', { maximumFractionDigits: 2 })}</p>
            <p className="text-sm text-gray-600 mt-2">Across {creditCards.length} cards</p>
          </div>

          {/* Total Savings Card */}
          <div className="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-lg p-6 shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Total Savings</h3>
              <TrendingUp className="text-blue-600" />
            </div>
            <p className="text-3xl font-bold text-blue-700">₱{totalSavings.toLocaleString('en-PH', { maximumFractionDigits: 2 })}</p>
            <p className="text-sm text-gray-600 mt-2">Across {savingsAccounts.length} accounts</p>
          </div>

          {/* Credit Utilization Card */}
          <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg p-6 shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Credit Utilization</h3>
              <AlertTriangle className="text-purple-600" />
            </div>
            <p className="text-3xl font-bold text-purple-700">{utilizationRate.toFixed(1)}%</p>
            <p className="text-sm text-gray-600 mt-2">of ₱{totalLimit.toLocaleString('en-PH')} limit</p>
          </div>
        </div>

        {/* Monthly Obligations */}
        <div className="bg-gradient-to-r from-pink-50 to-blue-50 rounded-lg p-6 shadow">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Monthly Obligations</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-gray-600">Subscriptions</p>
              <p className="text-2xl font-bold text-blue-600">₱{monthlySubscriptionTotal.toLocaleString('en-PH', { maximumFractionDigits: 2 })}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Fixed Bills</p>
              <p className="text-2xl font-bold text-red-600">₱{monthlyBillsTotal.toLocaleString('en-PH', { maximumFractionDigits: 2 })}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Installments</p>
              <p className="text-2xl font-bold text-pink-600">₱{monthlyInstallments.toLocaleString('en-PH', { maximumFractionDigits: 2 })}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Total</p>
              <p className="text-2xl font-bold text-purple-600">₱{totalMonthlyObligations.toLocaleString('en-PH', { maximumFractionDigits: 2 })}</p>
            </div>
          </div>
        </div>

        {/* Savings Accounts */}
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-6 shadow">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Savings Accounts</h3>
          <div className="space-y-3">
            {savingsAccounts.map((account) => (
              <div key={account.id} className="flex items-center justify-between bg-white p-4 rounded">
                <input
                  type="text"
                  value={account.name}
                  onChange={(e) =>
                    setSavingsAccounts(
                      savingsAccounts.map((acc) =>
                        acc.id === account.id ? { ...acc, name: e.target.value } : acc
                      )
                    )
                  }
                  className="text-sm font-medium text-gray-800 flex-1 border-b border-gray-300 px-2 py-1"
                  placeholder="Account name"
                />
                <input
                  type="number"
                  value={account.balance}
                  onChange={(e) =>
                    setSavingsAccounts(
                      savingsAccounts.map((acc) =>
                        acc.id === account.id ? { ...acc, balance: parseFloat(e.target.value) || 0 } : acc
                      )
                    )
                  }
                  className="text-lg font-bold text-blue-700 border-b border-gray-300 px-2 py-1 w-32 text-right"
                  placeholder="0"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Subscriptions */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Subscriptions</h3>
            <button
              onClick={() => {
                const newSub = {
                  id: 'sub-' + Date.now(),
                  name: 'New Subscription',
                  amount: 0,
                  day: 1,
                  card: creditCards[0]?.id || '',
                  status: 'Active',
                };
                setSubscriptions([...subscriptions, newSub]);
              }}
              className="bg-purple-500 text-white px-3 py-1 rounded text-sm hover:bg-purple-600"
            >
              <Plus size={16} className="inline mr-1" /> Add
            </button>
          </div>
          <div className="space-y-3">
            {subscriptions.map((sub) => (
              <div key={sub.id} className="bg-white p-4 rounded grid grid-cols-5 gap-2 items-center">
                <input
                  type="text"
                  value={sub.name}
                  onChange={(e) =>
                    setSubscriptions(
                      subscriptions.map((s) => (s.id === sub.id ? { ...s, name: e.target.value } : s))
                    )
                  }
                  placeholder="Name"
                  className="border border-gray-300 rounded px-2 py-1 text-sm"
                />
                <input
                  type="number"
                  value={sub.amount}
                  onChange={(e) =>
                    setSubscriptions(
                      subscriptions.map((s) =>
                        s.id === sub.id ? { ...s, amount: parseFloat(e.target.value) || 0 } : s
                      )
                    )
                  }
                  placeholder="Amount"
                  className="border border-gray-300 rounded px-2 py-1 text-sm"
                />
                <input
                  type="number"
                  value={sub.day}
                  onChange={(e) =>
                    setSubscriptions(
                      subscriptions.map((s) =>
                        s.id === sub.id ? { ...s, day: parseInt(e.target.value) || 1 } : s
                      )
                    )
                  }
                  placeholder="Day"
                  min="1"
                  max="31"
                  className="border border-gray-300 rounded px-2 py-1 text-sm"
                />
                <select
                  value={sub.card}
                  onChange={(e) =>
                    setSubscriptions(
                      subscriptions.map((s) => (s.id === sub.id ? { ...s, card: e.target.value } : s))
                    )
                  }
                  className="border border-gray-300 rounded px-2 py-1 text-sm"
                >
                  {creditCards.map((card) => (
                    <option key={card.id} value={card.id}>
                      {card.name.substring(0, 20)}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => setSubscriptions(subscriptions.filter((s) => s.id !== sub.id))}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Fixed Bills */}
        <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-lg p-6 shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Fixed Bills</h3>
            <button
              onClick={() => {
                const newBill = {
                  id: 'bill-' + Date.now(),
                  name: 'New Bill',
                  amount: 0,
                  day: 1,
                  status: 'Active',
                };
                setFixedBills([...fixedBills, newBill]);
              }}
              className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
            >
              <Plus size={16} className="inline mr-1" /> Add
            </button>
          </div>
          <div className="space-y-3">
            {fixedBills.map((bill) => (
              <div key={bill.id} className="bg-white p-4 rounded grid grid-cols-5 gap-2 items-center">
                <input
                  type="text"
                  value={bill.name}
                  onChange={(e) =>
                    setFixedBills(
                      fixedBills.map((b) => (b.id === bill.id ? { ...b, name: e.target.value } : b))
                    )
                  }
                  placeholder="Name"
                  className="border border-gray-300 rounded px-2 py-1 text-sm"
                />
                <input
                  type="number"
                  value={bill.amount}
                  onChange={(e) =>
                    setFixedBills(
                      fixedBills.map((b) =>
                        b.id === bill.id ? { ...b, amount: parseFloat(e.target.value) || 0 } : b
                      )
                    )
                  }
                  placeholder="Amount"
                  className="border border-gray-300 rounded px-2 py-1 text-sm"
                />
                <input
                  type="number"
                  value={bill.day}
                  onChange={(e) =>
                    setFixedBills(
                      fixedBills.map((b) => (b.id === bill.id ? { ...b, day: parseInt(e.target.value) || 1 } : b))
                    )
                  }
                  placeholder="Day"
                  min="1"
                  max="31"
                  className="border border-gray-300 rounded px-2 py-1 text-sm"
                />
                <select
                  value={bill.status}
                  onChange={(e) =>
                    setFixedBills(
                      fixedBills.map((b) => (b.id === bill.id ? { ...b, status: e.target.value } : b))
                    )
                  }
                  className="border border-gray-300 rounded px-2 py-1 text-sm"
                >
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
                <button
                  onClick={() => setFixedBills(fixedBills.filter((b) => b.id !== bill.id))}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Installments */}
        <div className="bg-gradient-to-r from-orange-50 to-pink-50 rounded-lg p-6 shadow">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Installments</h3>
          <div className="space-y-3">
            {installments.map((inst) => (
              <div key={inst.id} className="bg-white p-4 rounded">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-800">{inst.name}</h4>
                  <span className="text-sm text-gray-600">
                    ₱{inst.remainingBalance.toLocaleString('en-PH', { maximumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-2 text-sm text-gray-600">
                  <div>Monthly: ₱{inst.monthlyPayment.toFixed(2)}</div>
                  <div>Months: {inst.months}</div>
                  <div>Started: {new Date(inst.startDate).toLocaleDateString()}</div>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={inst.paid}
                      onChange={(e) =>
                        setInstallments(
                          installments.map((i) =>
                            i.id === inst.id ? { ...i, paid: e.target.checked } : i
                          )
                        )
                      }
                    />
                    <span>Paid this month</span>
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Credit Cards Tab
  const CreditCardsTab = () => {
    const suggestedPayments = calculateSuggestedPayments();

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {creditCards.map((card) => {
            const daysToStatement = calculateDaysUntil(new Date(), card.statementDay);
            const projectedBalance = calculateCardForecast(card, new Date());
            const nextStatementDate = new Date();
            nextStatementDate.setDate(nextStatementDate.getDate() + daysToStatement);

            return (
              <div
                key={card.id}
                className="bg-gradient-to-br from-pink-50 to-blue-50 border border-pink-200 rounded-lg p-6 shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-800">{card.name}</h3>
                  <CreditCard className="text-pink-600" />
                </div>

                <div className="space-y-3 text-sm">
                  <div>
                    <label className="block text-gray-600 mb-1">Current Balance</label>
                    <input
                      type="number"
                      value={card.balance}
                      onChange={(e) =>
                        setCreditCards(
                          creditCards.map((c) =>
                            c.id === card.id ? { ...c, balance: parseFloat(e.target.value) || 0 } : c
                          )
                        )
                      }
                      placeholder="Balance (₱)"
                      className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-gray-600 mb-1">Monthly Rate (%)</label>
                      <input
                        type="number"
                        value={card.rate}
                        onChange={(e) =>
                          setCreditCards(
                            creditCards.map((c) =>
                              c.id === card.id ? { ...c, rate: parseFloat(e.target.value) || 0 } : c
                            )
                          )
                        }
                        placeholder="Monthly Rate (%)"
                        className="w-full border border-gray-300 rounded px-3 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-600 mb-1">Credit Limit (₱)</label>
                      <input
                        type="number"
                        value={card.limit}
                        onChange={(e) =>
                          setCreditCards(
                            creditCards.map((c) =>
                              c.id === card.id ? { ...c, limit: parseFloat(e.target.value) || 0 } : c
                            )
                          )
                        }
                        placeholder="Credit Limit (₱)"
                        className="w-full border border-gray-300 rounded px-3 py-2"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-gray-600 mb-1">Min Payment (₱)</label>
                      <input
                        type="number"
                        value={card.minPayment}
                        onChange={(e) =>
                          setCreditCards(
                            creditCards.map((c) =>
                              c.id === card.id ? { ...c, minPayment: parseFloat(e.target.value) || 0 } : c
                            )
                          )
                        }
                        placeholder="Min Payment (₱)"
                        className="w-full border border-gray-300 rounded px-3 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-600 mb-1">Statement Day</label>
                      <input
                        type="number"
                        value={card.statementDay}
                        onChange={(e) =>
                          setCreditCards(
                            creditCards.map((c) =>
                              c.id === card.id ? { ...c, statementDay: parseInt(e.target.value) || 1 } : c
                            )
                          )
                        }
                        placeholder="Statement Day"
                        min="1"
                        max="31"
                        className="w-full border border-gray-300 rounded px-3 py-2"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-600 mb-1">Days to Due</label>
                    <input
                      type="number"
                      value={card.daysTodue}
                      onChange={(e) =>
                        setCreditCards(
                          creditCards.map((c) =>
                            c.id === card.id ? { ...c, daysTodue: parseInt(e.target.value) || 0 } : c
                          )
                        )
                      }
                      placeholder="Days to Due"
                      className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                  </div>

                  <div className="bg-white p-3 rounded border border-purple-200">
                    <p className="text-gray-600">Suggested Payment (Avalanche)</p>
                    <p className="text-2xl font-bold text-purple-600">
                      ₱{(suggestedPayments[card.id] || card.minPayment).toFixed(2)}
                    </p>
                  </div>

                  <div className="bg-white p-3 rounded border border-blue-200">
                    <p className="text-gray-600">Projected Balance on {nextStatementDate.toLocaleDateString()}</p>
                    <p className="text-2xl font-bold text-blue-600">
                      ₱{projectedBalance.toLocaleString('en-PH', { maximumFractionDigits: 2 })}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      const amount = prompt('Payment amount:');
                      const date = prompt('Payment date (YYYY-MM-DD):', new Date().toISOString().split('T')[0]);
                      if (amount && date) {
                        setCreditCards(
                          creditCards.map((c) =>
                            c.id === card.id
                              ? {
                                  ...c,
                                  balance: Math.max(0, c.balance - parseFloat(amount)),
                                  paymentHistory: [
                                    ...(c.paymentHistory || []),
                                    { date, amount: parseFloat(amount) },
                                  ],
                                }
                              : c
                          )
                        );
                      }
                    }}
                    className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 font-semibold"
                  >
                    Log Payment
                  </button>

                  {card.paymentHistory && card.paymentHistory.length > 0 && (
                    <div className="bg-white p-3 rounded">
                      <p className="font-semibold text-gray-800 mb-2">Payment History</p>
                      <div className="space-y-1 max-h-32 overflow-y-auto">
                        {card.paymentHistory.map((payment, idx) => (
                          <div key={idx} className="text-sm text-gray-600 flex justify-between">
                            <span>{payment.date}</span>
                            <span className="font-semibold">₱{payment.amount.toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Grocery Tab
  const GroceryTab = () => {
    const [expandedCategory, setExpandedCategory] = useState('VITAMINS');
    const [editingItem, setEditingItem] = useState(null);

    const groupedItems = useMemo(() => {
      return groceryItems.reduce((acc, item) => {
        if (!acc[item.category]) acc[item.category] = [];
        acc[item.category].push(item);
        return acc;
      }, {});
    }, [groceryItems]);

    const handleMarkPurchased = (itemId) => {
      setGroceryItems(
        groceryItems.map((item) =>
          item.id === itemId ? { ...item, lastPurchased: new Date().toISOString().split('T')[0] } : item
        )
      );
    };

    const calculateDaysUntilReplenish = (item) => {
      if (!item.lastPurchased) return 'Not purchased yet';
      const lastDate = new Date(item.lastPurchased);
      const nextDate = new Date(lastDate);
      nextDate.setDate(nextDate.getDate() + item.frequencyDays);
      const today = new Date();
      const daysLeft = Math.ceil((nextDate - today) / (1000 * 60 * 60 * 24));
      return daysLeft > 0 ? `${daysLeft} days` : 'Due now!';
    };

    return (
      <div className="space-y-4">
        {Object.entries(groupedItems).map(([category, items]) => (
          <div key={category} className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-lg shadow">
            <button
              onClick={() => setExpandedCategory(expandedCategory === category ? null : category)}
              className="w-full p-4 flex items-center justify-between hover:bg-white hover:bg-opacity-50 transition"
            >
              <h3 className="text-lg font-bold text-gray-800">{category}</h3>
              <ChevronDown
                size={20}
                className={`text-pink-600 transition ${expandedCategory === category ? 'rotate-180' : ''}`}
              />
            </button>

            {expandedCategory === category && (
              <div className="p-4 border-t border-pink-200 space-y-3">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white p-4 rounded border border-pink-200 flex items-center justify-between"
                  >
                    {editingItem === item.id ? (
                      <div className="flex-1 grid grid-cols-5 gap-2">
                        <input
                          type="text"
                          value={item.name}
                          onChange={(e) =>
                            setGroceryItems(
                              groceryItems.map((it) =>
                                it.id === item.id ? { ...it, name: e.target.value } : it
                              )
                            )
                          }
                          placeholder="Name"
                          className="border border-gray-300 rounded px-2 py-1 text-sm"
                        />
                        <input
                          type="number"
                          value={item.price}
                          onChange={(e) =>
                            setGroceryItems(
                              groceryItems.map((it) =>
                                it.id === item.id ? { ...it, price: parseFloat(e.target.value) || 0 } : it
                              )
                            )
                          }
                          placeholder="Price"
                          className="border border-gray-300 rounded px-2 py-1 text-sm"
                        />
                        <input
                          type="number"
                          value={item.frequencyDays}
                          onChange={(e) =>
                            setGroceryItems(
                              groceryItems.map((it) =>
                                it.id === item.id ? { ...it, frequencyDays: parseInt(e.target.value) || 30 } : it
                              )
                            )
                          }
                          placeholder="Days"
                          className="border border-gray-300 rounded px-2 py-1 text-sm"
                        />
                        <input
                          type="date"
                          value={item.lastPurchased || ''}
                          onChange={(e) =>
                            setGroceryItems(
                              groceryItems.map((it) =>
                                it.id === item.id ? { ...it, lastPurchased: e.target.value } : it
                              )
                            )
                          }
                          className="border border-gray-300 rounded px-2 py-1 text-sm"
                        />
                        <button
                          onClick={() => setEditingItem(null)}
                          className="text-green-600 hover:text-green-800"
                        >
                          <Check size={16} />
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800">{item.name}</h4>
                          <p className="text-sm text-gray-600">
                            ₱{item.price.toFixed(2)} • Every {item.frequencyDays} days • {calculateDaysUntilReplenish(item)}
                          </p>
                        </div>
                        <button
                          onClick={() => handleMarkPurchased(item.id)}
                          className="bg-green-500 text-white px-4 py-2 rounded text-sm hover:bg-green-600 mr-2"
                        >
                          Mark Purchased
                        </button>
                        <button
                          onClick={() => setEditingItem(item.id)}
                          className="text-blue-600 hover:text-blue-800 mr-2"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => setGroceryItems(groceryItems.filter((it) => it.id !== item.id))}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 size={16} />
                        </button>
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Add Item Form */}
        <div className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-lg p-6 shadow">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Add Item</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              const newItem = {
                id: 'item-' + Date.now(),
                category: formData.get('category') || 'VITAMINS',
                name: formData.get('name') || '',
                price: parseFloat(formData.get('price')) || 0,
                frequencyDays: parseInt(formData.get('frequencyDays')) || 30,
                lastPurchased: null,
                card: formData.get('card') || creditCards[0]?.id || '',
              };
              if (newItem.name) {
                setGroceryItems([...groceryItems, newItem]);
                e.target.reset();
              }
            }}
            className="grid grid-cols-1 md:grid-cols-5 gap-3"
          >
            <select name="category" className="border border-gray-300 rounded px-3 py-2" defaultValue="VITAMINS">
              <option>VITAMINS</option>
              <option>SKINCARE</option>
              <option>TOILETRIES</option>
              <option>HOUSEHOLD</option>
            </select>
            <input
              type="text"
              name="name"
              placeholder="Item name"
              className="border border-gray-300 rounded px-3 py-2"
              required
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              step="0.01"
              className="border border-gray-300 rounded px-3 py-2"
              required
            />
            <input
              type="number"
              name="frequencyDays"
              placeholder="Frequency (days)"
              className="border border-gray-300 rounded px-3 py-2"
              required
            />
            <button type="submit" className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 font-semibold">
              Add Item
            </button>
          </form>
        </div>
      </div>
    );
  };

  // Purchases Tab
  const PurchasesTab = () => {
    const [filterCategory, setFilterCategory] = useState('All');

    const categories = useMemo(() => {
      const cats = new Set(purchases.map((p) => p.category));
      return ['All', ...Array.from(cats)];
    }, [purchases]);

    const filteredPurchases = filterCategory === 'All' ? purchases : purchases.filter((p) => p.category === filterCategory);

    const handleAddPurchase = () => {
      const newPurchase = {
        id: 'purchase-' + Date.now(),
        description: '',
        amount: 0,
        category: 'Other',
        card: creditCards[0]?.id || '',
        isNecessity: false,
        date: new Date().toISOString().split('T')[0],
        notes: '',
      };
      setPurchases([...purchases, newPurchase]);
    };

    return (
      <div className="space-y-4">
        <div className="flex gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-4 py-2 rounded font-semibold transition ${
                filterCategory === cat
                  ? 'bg-pink-600 text-white'
                  : 'bg-pink-100 text-pink-800 hover:bg-pink-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <button
          onClick={handleAddPurchase}
          className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-2 rounded hover:from-pink-600 hover:to-purple-600 font-semibold flex items-center gap-2"
        >
          <Plus size={20} /> Add Purchase
        </button>

        <div className="space-y-3">
          {filteredPurchases.map((purchase) => (
            <div key={purchase.id} className="bg-gradient-to-r from-pink-50 to-blue-50 p-4 rounded border border-pink-200">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                <input
                  type="text"
                  value={purchase.description}
                  onChange={(e) =>
                    setPurchases(
                      purchases.map((p) =>
                        p.id === purchase.id ? { ...p, description: e.target.value } : p
                      )
                    )
                  }
                  placeholder="Description"
                  className="border border-gray-300 rounded px-3 py-2"
                />
                <input
                  type="number"
                  value={purchase.amount}
                  onChange={(e) =>
                    setPurchases(
                      purchases.map((p) =>
                        p.id === purchase.id ? { ...p, amount: parseFloat(e.target.value) || 0 } : p
                      )
                    )
                  }
                  placeholder="Amount"
                  step="0.01"
                  className="border border-gray-300 rounded px-3 py-2"
                />
                <select
                  value={purchase.category}
                  onChange={(e) =>
                    setPurchases(
                      purchases.map((p) =>
                        p.id === purchase.id ? { ...p, category: e.target.value } : p
                      )
                    )
                  }
                  className="border border-gray-300 rounded px-3 py-2"
                >
                  <option>Groceries</option>
                  <option>Utilities</option>
                  <option>Entertainment</option>
                  <option>Transport</option>
                  <option>Health</option>
                  <option>Other</option>
                </select>
                {purchase.category === 'Other' && (
                  <input
                    type="text"
                    value={purchase.customCategory || ''}
                    onChange={(e) =>
                      setPurchases(
                        purchases.map((p) =>
                          p.id === purchase.id ? { ...p, customCategory: e.target.value } : p
                        )
                      )
                    }
                    placeholder="Custom category"
                    className="border border-gray-300 rounded px-3 py-2"
                  />
                )}
                <select
                  value={purchase.card}
                  onChange={(e) =>
                    setPurchases(
                      purchases.map((p) =>
                        p.id === purchase.id ? { ...p, card: e.target.value } : p
                      )
                    )
                  }
                  className="border border-gray-300 rounded px-3 py-2"
                >
                  {creditCards.map((card) => (
                    <option key={card.id} value={card.id}>
                      {card.name.substring(0, 15)}
                    </option>
                  ))}
                  <option value="cash">Cash</option>
                </select>
                <button
                  onClick={() => setPurchases(purchases.filter((p) => p.id !== purchase.id))}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <input
                  type="date"
                  value={purchase.date}
                  onChange={(e) =>
                    setPurchases(
                      purchases.map((p) =>
                        p.id === purchase.id ? { ...p, date: e.target.value } : p
                      )
                    )
                  }
                  className="border border-gray-300 rounded px-3 py-2 text-sm"
                />
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={purchase.isNecessity}
                    onChange={(e) =>
                      setPurchases(
                        purchases.map((p) =>
                          p.id === purchase.id ? { ...p, isNecessity: e.target.checked } : p
                        )
                      )
                    }
                  />
                  <span className="text-sm text-gray-700">Is Necessity/Recurring</span>
                </label>
                {purchase.isNecessity && (
                  <select
                    value={purchase.linkedGrocery || ''}
                    onChange={(e) =>
                      setPurchases(
                        purchases.map((p) =>
                          p.id === purchase.id ? { ...p, linkedGrocery: e.target.value } : p
                        )
                      )
                    }
                    className="border border-gray-300 rounded px-2 py-1 text-sm"
                  >
                    <option value="">Link to grocery item...</option>
                    {groceryItems.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Travel Tab
  const TravelTab = () => {
    const [showAddTripForm, setShowAddTripForm] = useState(false);
    const [showAddExpenseForm, setShowAddExpenseForm] = useState(false);
    const [selectedTrip, setSelectedTrip] = useState(null);

    const handleAddTrip = (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const newTrip = {
        id: 'trip-' + Date.now(),
        name: formData.get('name') || '',
        destination: formData.get('destination') || '',
        startDate: formData.get('startDate') || '',
        endDate: formData.get('endDate') || '',
        notes: formData.get('notes') || '',
        expenses: [],
      };
      setTrips([...trips, newTrip]);
      setShowAddTripForm(false);
      e.target.reset();
    };

    const handleAddExpense = (e) => {
      e.preventDefault();
      if (!selectedTrip) return;
      const formData = new FormData(e.target);
      const newExpense = {
        id: 'exp-' + Date.now(),
        description: formData.get('description') || '',
        amount: parseFloat(formData.get('amount')) || 0,
        category: formData.get('category') || 'Other',
        card: formData.get('card') || creditCards[0]?.id || '',
        paid: formData.get('paid') === 'on',
        date: formData.get('date') || '',
        notes: formData.get('notes') || '',
      };

      setTrips(
        trips.map((trip) =>
          trip.id === selectedTrip
            ? { ...trip, expenses: [...trip.expenses, newExpense] }
            : trip
        )
      );
      setShowAddExpenseForm(false);
      e.target.reset();
    };

    return (
      <div className="space-y-4">
        <button
          onClick={() => setShowAddTripForm(!showAddTripForm)}
          className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-6 py-2 rounded hover:from-teal-600 hover:to-cyan-600 font-semibold flex items-center gap-2"
        >
          <Plus size={20} /> Add Trip
        </button>

        {showAddTripForm && (
          <div className="bg-gradient-to-r from-teal-50 to-cyan-50 p-6 rounded border border-teal-200 shadow">
            <h3 className="text-lg font-bold text-gray-800 mb-4">New Trip</h3>
            <form onSubmit={handleAddTrip} className="space-y-3">
              <input
                type="text"
                name="name"
                placeholder="Trip Name"
                required
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
              <input
                type="text"
                name="destination"
                placeholder="Destination"
                required
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="date"
                  name="startDate"
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
                <input
                  type="date"
                  name="endDate"
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <textarea
                name="notes"
                placeholder="Notes"
                className="w-full border border-gray-300 rounded px-3 py-2"
                rows="3"
              />
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="bg-teal-500 text-white px-6 py-2 rounded hover:bg-teal-600 font-semibold"
                >
                  Add Trip
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddTripForm(false)}
                  className="bg-gray-400 text-white px-6 py-2 rounded hover:bg-gray-500"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="space-y-4">
          {trips.map((trip) => (
            <div key={trip.id} className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-lg p-6 shadow border border-teal-200">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{trip.name}</h3>
                  <p className="text-sm text-gray-600">
                    {trip.destination} • {new Date(trip.startDate).toLocaleDateString()} -{' '}
                    {new Date(trip.endDate).toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={() => setTrips(trips.filter((t) => t.id !== trip.id))}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 size={20} />
                </button>
              </div>

              {trip.notes && <p className="text-sm text-gray-700 mb-4 italic">{trip.notes}</p>}

              <div className="mb-4">
                <h4 className="font-semibold text-gray-800 mb-3">Expenses</h4>
                {trip.expenses.length > 0 ? (
                  <div className="space-y-2 mb-3">
                    {trip.expenses.map((exp) => (
                      <div
                        key={exp.id}
                        className="bg-white p-3 rounded flex items-center justify-between"
                      >
                        <div>
                          <p className="font-semibold text-gray-800">{exp.description}</p>
                          <p className="text-sm text-gray-600">
                            {exp.category} • {exp.date} • {creditCards.find((c) => c.id === exp.card)?.name}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-gray-800">
                            ₱{exp.amount.toFixed(2)}
                          </p>
                          <p className="text-xs text-gray-600">
                            {exp.paid ? 'Paid' : 'Unpaid'}
                          </p>
                          <button
                            onClick={() =>
                              setTrips(
                                trips.map((t) =>
                                  t.id === trip.id
                                    ? {
                                        ...t,
                                        expenses: t.expenses.filter((e) => e.id !== exp.id),
                                      }
                                    : t
                                )
                              )
                            }
                            className="text-red-600 hover:text-red-800 text-xs mt-1"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-600 mb-3">No expenses yet</p>
                )}

                <button
                  onClick={() => {
                    setSelectedTrip(trip.id);
                    setShowAddExpenseForm(!showAddExpenseForm || selectedTrip !== trip.id);
                  }}
                  className="bg-teal-500 text-white px-4 py-2 rounded text-sm hover:bg-teal-600 font-semibold flex items-center gap-2"
                >
                  <Plus size={16} /> Add Expense
                </button>

                {showAddExpenseForm && selectedTrip === trip.id && (
                  <form onSubmit={handleAddExpense} className="mt-3 p-3 bg-white rounded border border-teal-200 space-y-2">
                    <input
                      type="text"
                      name="description"
                      placeholder="Description"
                      required
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="number"
                        name="amount"
                        placeholder="Amount"
                        step="0.01"
                        required
                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                      />
                      <select name="category" className="border border-gray-300 rounded px-3 py-2 text-sm">
                        <option>Flight</option>
                        <option>Hotel</option>
                        <option>Baggage</option>
                        <option>Travel Tax</option>
                        <option>Activities</option>
                        <option>Cash Allotment</option>
                        <option>SIM Card</option>
                        <option>Food</option>
                        <option>Transport</option>
                        <option>Shopping</option>
                        <option>Insurance</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <select name="card" className="border border-gray-300 rounded px-3 py-2 text-sm">
                        {creditCards.map((card) => (
                          <option key={card.id} value={card.id}>
                            {card.name.substring(0, 15)}
                          </option>
                        ))}
                        <option value="cash">Cash</option>
                      </select>
                      <input
                        type="date"
                        name="date"
                        className="border border-gray-300 rounded px-3 py-2 text-sm"
                      />
                    </div>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" name="paid" />
                      <span className="text-sm text-gray-700">Paid</span>
                    </label>
                    <textarea
                      name="notes"
                      placeholder="Notes"
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                      rows="2"
                    />
                    <div className="flex gap-2">
                      <button
                        type="submit"
                        className="bg-teal-500 text-white px-4 py-2 rounded text-sm hover:bg-teal-600 font-semibold"
                      >
                        Add Expense
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowAddExpenseForm(false)}
                        className="bg-gray-400 text-white px-4 py-2 rounded text-sm hover:bg-gray-500"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Calendar Tab
  const CalendarTab = () => {
    const getDaysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
    const getFirstDayOfMonth = (month, year) => new Date(year, month, 1).getDay();

    const handlePrevMonth = () => {
      if (calendarMonth === 0) {
        setCalendarMonth(11);
        setCalendarYear(calendarYear - 1);
      } else {
        setCalendarMonth(calendarMonth - 1);
      }
    };

    const handleNextMonth = () => {
      if (calendarMonth === 11) {
        setCalendarMonth(0);
        setCalendarYear(calendarYear + 1);
      } else {
        setCalendarMonth(calendarMonth + 1);
      }
    };

    const daysInMonth = getDaysInMonth(calendarMonth, calendarYear);
    const firstDay = getFirstDayOfMonth(calendarMonth, calendarYear);
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    const monthName = new Date(calendarYear, calendarMonth).toLocaleString('en-US', { month: 'long' });

    return (
      <div className="space-y-4">
        <div className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-lg p-6 shadow">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={handlePrevMonth}
              className="bg-pink-500 text-white p-2 rounded hover:bg-pink-600"
            >
              <ChevronLeft size={20} />
            </button>
            <h2 className="text-2xl font-bold text-gray-800">
              {monthName} {calendarYear}
            </h2>
            <button
              onClick={handleNextMonth}
              className="bg-pink-500 text-white p-2 rounded hover:bg-pink-600"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-2 mb-4">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="text-center font-bold text-gray-700 py-2">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {days.map((day, idx) => {
              if (!day) return <div key={`empty-${idx}`} className="aspect-square" />;

              const dateStr = `${calendarYear}-${String(calendarMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
              const hasEvent = selectedDate === day;
              const payDays = getPayDayDates(calendarMonth, calendarYear);
              const isPayDay = payDays.includes(day);
              const isQuarterlyGrocery = [2, 5, 8, 11].includes(calendarMonth) && day === 30;

              // Count events for this day
              let eventCount = 0;
              if (isPayDay) eventCount++;
              if (isQuarterlyGrocery) eventCount++;

              subscriptions.forEach((sub) => {
                if (sub.day === day) eventCount++;
              });
              fixedBills.forEach((bill) => {
                if (bill.day === day) eventCount++;
              });
              creditCards.forEach((card) => {
                if (card.statementDay === day) eventCount++;
              });
              trips.forEach((trip) => {
                const tripStart = new Date(trip.startDate);
                const tripEnd = new Date(trip.endDate);
                const checkDate = new Date(calendarYear, calendarMonth, day);
                if (checkDate >= tripStart && checkDate <= tripEnd) eventCount++;
              });

              return (
                <button
                  key={day}
                  onClick={() => handleDateClick(day)}
                  className={`aspect-square p-2 rounded border-2 transition ${
                    hasEvent
                      ? 'border-pink-500 bg-pink-100'
                      : eventCount > 0
                      ? 'border-purple-300 bg-purple-50'
                      : 'border-gray-200 bg-white hover:border-pink-300'
                  }`}
                >
                  <div className="text-sm font-bold text-gray-800">{day}</div>
                  {eventCount > 0 && (
                    <div className="text-xs text-pink-600 font-semibold">{eventCount} event{eventCount > 1 ? 's' : ''}</div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Date Details */}
        {selectedDate && selectedDateEvents.length > 0 && (
          <div className="bg-gradient-to-br from-pink-50 to-blue-50 rounded-lg p-6 shadow border border-pink-200">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              {monthName} {selectedDate}, {calendarYear}
            </h3>
            <div className="space-y-3">
              {selectedDateEvents.map((event, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded border-l-4 ${
                    event.color === 'green'
                      ? 'bg-green-50 border-green-500'
                      : event.color === 'red'
                      ? 'bg-red-50 border-red-500'
                      : event.color === 'blue'
                      ? 'bg-blue-50 border-blue-500'
                      : event.color === 'orange'
                      ? 'bg-orange-50 border-orange-500'
                      : event.color === 'teal'
                      ? 'bg-teal-50 border-teal-500'
                      : 'bg-pink-50 border-pink-500'
                  }`}
                >
                  <p className="font-semibold text-gray-800">{event.title}</p>
                  <p className="text-sm text-gray-600">{event.description}</p>
                </div>
              ))}
            </div>

            {/* Debt Forecast */}
            <div className="mt-4 p-4 bg-white rounded border border-gray-300">
              <h4 className="font-semibold text-gray-800 mb-2">Debt Forecast</h4>
              <div className="space-y-2 text-sm">
                {creditCards.filter((c) => c.balance > 0).map((card) => {
                  const forecast = calculateCardForecast(card, new Date(calendarYear, calendarMonth, selectedDate));
                  const suggested = calculateSuggestedPayments()[card.id] || card.minPayment;
                  return (
                    <div key={card.id} className="flex justify-between">
                      <div>
                        <p className="font-semibold text-gray-800">{card.name}</p>
                        <p className="text-xs text-gray-600">Forecasted: ₱{forecast.toFixed(2)}</p>
                        <p className="text-xs text-gray-600">Suggested payment: ₱{suggested.toFixed(2)}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Export data function
  const exportData = () => {
    const data = {
      creditCards,
      savingsAccounts,
      groceryItems,
      purchases,
      trips,
      subscriptions,
      fixedBills,
      installments,
      monthlyIncome,
    };
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mysledger-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-blue-50 relative overflow-hidden">
      {/* Sakura Background */}
      {sakuraPetals.map((petal) => (
        <div
          key={petal.id}
          className="fixed pointer-events-none"
          style={{
            left: `${petal.left}%`,
            top: `${petal.top}%`,
            opacity: petal.opacity,
            transform: `rotate(${Math.random() * 360}deg)`,
            zIndex: 0,
          }}
        >
          <SakuraPetal style={{ width: petal.size, height: petal.size }} />
        </div>
      ))}

      <div className="relative z-10">
        {/* Header */}
        <header className="bg-gradient-to-r from-pink-200 via-purple-100 to-blue-200 shadow-md sticky top-0">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <DollarSign className="text-pink-600" size={32} />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent">
                MyLedger
              </h1>
              <span className="text-sm text-gray-700 font-semibold ml-4">For Trish</span>
            </div>

            <button
              onClick={exportData}
              className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 rounded hover:from-pink-600 hover:to-purple-600 font-semibold"
            >
              <Download size={18} /> Export Data
            </button>
          </div>
        </header>

        {/* Navigation Tabs */}
        <nav className="bg-white border-b border-pink-200 sticky top-16 z-20">
          <div className="max-w-7xl mx-auto px-4 flex flex-wrap gap-2 py-3">
            {[
              { id: 'dashboard', icon: Home, label: 'Dashboard' },
              { id: 'calendar', icon: Calendar, label: 'Calendar' },
              { id: 'credit-cards', icon: CreditCard, label: 'Credit Cards' },
              { id: 'grocery', icon: Package, label: 'Grocery' },
              { id: 'purchases', icon: ShoppingCart, label: 'Purchases' },
              { id: 'travel', icon: Plane, label: 'Travel' },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded font-semibold transition ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white'
                      : 'text-gray-700 hover:bg-pink-100'
                  }`}
                >
                  <Icon size={20} /> {tab.label}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 py-8">
          {activeTab === 'dashboard' && <DashboardTab />}
          {activeTab === 'calendar' && <CalendarTab />}
          {activeTab === 'credit-cards' && <CreditCardsTab />}
          {activeTab === 'grocery' && <GroceryTab />}
          {activeTab === 'purchases' && <PurchasesTab />}
          {activeTab === 'travel' && <TravelTab />}
        </main>
      </div>
    </div>
  );
};

export default MyLedger;
