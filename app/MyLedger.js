'use client';

import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// SakuraPetal Component
const SakuraPetal = () => (
  <div className="fixed pointer-events-none">
    <div className="animate-pulse text-pink-200 text-2xl" style={{ animation: 'fall 8s linear forwards' }}>🌸</div>
  </div>
);

const MyLedger = () => {
  // ===== CORE STATE =====
  const [exchangeRate, setExchangeRate] = useState(57);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentDate, setCurrentDate] = useState(new Date());

  // ===== CREDIT CARDS STATE =====
  const [creditCards, setCreditCards] = useState(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('ml_cards') : null;
    if (stored) return JSON.parse(stored);
    return [
      { id: 'union-rewards', name: 'Union Bank Rewards Platinum', balance: 0, rate: 3, minPayment: 0, statementDay: 6, daysToDue: 17, limit: 45000, paymentHistory: [] },
      { id: 'union-cebu', name: 'Union Bank Cebu Pacific Platinum', balance: 93989.40, rate: 3, minPayment: 4699.47, statementDay: 10, daysToDue: 21, limit: 152000, paymentHistory: [] },
      { id: 'bpi-gold', name: 'BPI Gold Rewards Card', balance: 40177.43, rate: 3, minPayment: 2008.87, statementDay: 15, daysToDue: 21, limit: 136000, paymentHistory: [] },
      { id: 'security-wave', name: 'Security Bank Wave Card', balance: 66961.88, rate: 2.5, minPayment: 3348.09, statementDay: 12, daysToDue: 25, limit: 70000, paymentHistory: [] },
      { id: 'eastwest-jcb', name: 'East West JCB Gold', balance: 116900.35, rate: 3, minPayment: 5845.02, statementDay: 10, daysToDue: 20, limit: 145000, paymentHistory: [] },
      { id: 'rcbc-gold', name: 'RCBC Gold Flex', balance: 62290.36, rate: 3, minPayment: 3114.52, statementDay: 3, daysToDue: 58, limit: 73000, paymentHistory: [] },
      { id: 'atome', name: 'Atome (Virtual/Inactive)', balance: 0, rate: 0, minPayment: 0, statementDay: 18, daysToDue: 10, limit: 81000, paymentHistory: [] },
      { id: 'shopee', name: 'Shopee SpayLater', balance: 0, rate: 0, minPayment: 0, statementDay: 25, daysToDue: 10, limit: 75000, paymentHistory: [] },
    ];
  });
  const [editingCardId, setEditingCardId] = useState(null);
  const [editCardData, setEditCardData] = useState({});
  const [showAddCard, setShowAddCard] = useState(false);
  const [addCardData, setAddCardData] = useState({ name: '', balance: '', rate: '', limit: '', minPayment: '', statementDay: '', daysToDue: '' });
  const [loggingPaymentCardId, setLoggingPaymentCardId] = useState(null);
  const [paymentFormData, setPaymentFormData] = useState({ amount: '', date: '' });
  const [showPaymentHistory, setShowPaymentHistory] = useState(null);

  // ===== SAVINGS STATE =====
  const [savingsAccounts, setSavingsAccounts] = useState(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('ml_savings') : null;
    if (stored) return JSON.parse(stored);
    return [
      { id: 'bpi-savings', name: 'BPI Savings', balance: 0 },
      { id: 'rcbc-savings', name: 'RCBC Savings', balance: 0 },
      { id: 'ub-savings', name: 'UnionBank Savings', balance: 0 },
    ];
  });
  const [editingSavingsId, setEditingSavingsId] = useState(null);
  const [editSavingsData, setEditSavingsData] = useState({});
  const [showAddSavings, setShowAddSavings] = useState(false);
  const [addSavingsData, setAddSavingsData] = useState({ name: '', balance: '' });

  // ===== SUBSCRIPTIONS STATE =====
  const [subscriptions, setSubscriptions] = useState(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('ml_subscriptions') : null;
    if (stored) return JSON.parse(stored);
    return [
      { id: 'hbo', name: 'HBO Max', amount: 199, day: 27, card: 'security-wave', status: 'Active' },
      { id: 'canva', name: 'Canva', amount: 299, day: 27, card: 'security-wave', status: 'Active' },
      { id: 'appletv', name: 'Apple TV+', amount: 607.99, day: 1, card: 'security-wave', status: 'Active' },
      { id: 'netflix', name: 'Netflix', amount: 625.19, day: 5, card: 'bpi-gold', status: 'Active' },
      { id: 'spotify', name: 'Spotify', amount: 281.79, day: 8, card: 'bpi-gold', status: 'Active' },
      { id: 'googleone', name: 'Google One', amount: 604.99, day: 21, card: 'bpi-gold', status: 'Active' },
    ];
  });
  const [editingSubId, setEditingSubId] = useState(null);
  const [editSubData, setEditSubData] = useState({});
  const [showAddSub, setShowAddSub] = useState(false);
  const [addSubData, setAddSubData] = useState({ name: '', amount: '', day: '', card: '', status: 'Active' });

  // ===== FIXED BILLS STATE =====
  const [fixedBills, setFixedBills] = useState(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('ml_bills') : null;
    if (stored) return JSON.parse(stored);
    return [
      { id: 'prulife', name: 'PruLife Insurance', amount: 3000, day: 15 },
      { id: 'globe', name: 'Globe Phone Plan', amount: 4893.84, day: 7 },
    ];
  });
  const [editingBillId, setEditingBillId] = useState(null);
  const [editBillData, setEditBillData] = useState({});
  const [showAddBill, setShowAddBill] = useState(false);
  const [addBillData, setAddBillData] = useState({ name: '', amount: '', day: '' });

  // ===== INSTALLMENTS STATE =====
  const [installments, setInstallments] = useState(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('ml_installments') : null;
    if (stored) return JSON.parse(stored);
    return [
      { id: 'dryer', name: 'Dryer', totalAmount: 25000, monthlyPayment: 1041.67, months: 24, startDate: '2025-06-14', card: 'bpi-gold', remainingBalance: 15625, paidThisMonth: false },
      { id: 'macmini', name: 'Mac Mini', totalAmount: 38469, monthlyPayment: 1602.88, months: 24, startDate: '2025-05-23', card: 'bpi-gold', remainingBalance: 22440.25, paidThisMonth: false },
      { id: 'samsung', name: 'Samsung', totalAmount: 47513, monthlyPayment: 1979.71, months: 24, startDate: '2025-12-12', card: 'bpi-gold', remainingBalance: 41573.88, paidThisMonth: false },
      { id: 'fiance-phone', name: "Fiancé's Phone", totalAmount: 24990, monthlyPayment: 1041.25, months: 24, startDate: '2025-03-14', card: 'bpi-gold', remainingBalance: 12495, paidThisMonth: false, shareAmount: 0 },
      { id: 'xmas-gifts', name: 'Christmas Gifts', totalAmount: 2838.49, monthlyPayment: 946.16, months: 3, startDate: '2025-12-01', card: 'shopee', remainingBalance: 0, paidThisMonth: true },
      { id: 'dr-althea', name: 'Dr. Althea 345', totalAmount: 1028.32, monthlyPayment: 342.77, months: 3, startDate: '2026-03-01', card: 'shopee', remainingBalance: 0, paidThisMonth: true },
      { id: 'room-light', name: 'Room Light', totalAmount: 1740.22, monthlyPayment: 580.07, months: 3, startDate: '2026-03-01', card: 'shopee', remainingBalance: 0, paidThisMonth: true },
      { id: 'detail-makeup', name: 'Detail Make Up', totalAmount: 1001.73, monthlyPayment: 333.91, months: 3, startDate: '2026-03-01', card: 'shopee', remainingBalance: 0, paidThisMonth: true },
      { id: 'ice-maker', name: 'Ice Maker', totalAmount: 3889, monthlyPayment: 1296.33, months: 3, startDate: '2026-03-01', card: 'shopee', remainingBalance: 0, paidThisMonth: true },
    ];
  });
  const [showAddInstallment, setShowAddInstallment] = useState(false);
  const [addInstallmentData, setAddInstallmentData] = useState({ name: '', totalAmount: '', monthlyPayment: '', months: '', startDate: '', card: '', remainingBalance: '' });

  // ===== GROCERY STATE =====
  const [groceryItems, setGroceryItems] = useState(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('ml_grocery') : null;
    if (stored) return JSON.parse(stored);
    return [
      { id: 'vitd3k2', name: 'Vitamin D3 & K2', price: 975, frequencyDays: 30, category: 'VITAMINS', card: 'bpi-gold', lastPurchased: '2026-03-01' },
      { id: 'methio', name: 'Met Thatione', price: 2017, frequencyDays: 30, category: 'VITAMINS', card: 'bpi-gold', lastPurchased: '2026-03-01' },
      { id: 'cranberry', name: 'Cranberry', price: 1297, frequencyDays: 60, category: 'VITAMINS', card: 'bpi-gold', lastPurchased: '2026-01-15' },
      { id: 'vitc', name: 'Vitamin C', price: 280.90, frequencyDays: 30, category: 'VITAMINS', card: 'bpi-gold', lastPurchased: '2026-03-01' },
      { id: 'vite', name: 'Vitamin E', price: 280.90, frequencyDays: 60, category: 'VITAMINS', card: 'bpi-gold', lastPurchased: '2026-01-15' },
      { id: 'magpure', name: 'Magnesium Pure', price: 1537, frequencyDays: 45, category: 'VITAMINS', card: 'bpi-gold', lastPurchased: '2026-02-10' },
      { id: 'tonercele', name: 'Toner Celeteque', price: 194, frequencyDays: 90, category: 'SKINCARE', card: 'bpi-gold', lastPurchased: '2025-12-15' },
      { id: 'keana-pack', name: 'Keana Rice Pack', price: 468.17, frequencyDays: 60, category: 'SKINCARE', card: 'bpi-gold', lastPurchased: '2026-01-15' },
      { id: 'keana-wash', name: 'Keana Rice Face Wash', price: 280.90, frequencyDays: 60, category: 'SKINCARE', card: 'bpi-gold', lastPurchased: '2026-01-15' },
      { id: 'melanocc', name: 'Melano CC', price: 329.59, frequencyDays: 365, category: 'SKINCARE', card: 'bpi-gold', lastPurchased: '2025-03-15' },
      { id: 'hadalabo', name: 'Hada Labo', price: 370.79, frequencyDays: 365, category: 'SKINCARE', card: 'bpi-gold', lastPurchased: '2025-04-10' },
      { id: '345cream', name: '345 Cream', price: 1050, frequencyDays: 90, category: 'SKINCARE', card: 'bpi-gold', lastPurchased: '2025-12-15' },
      { id: 'shampoo', name: 'Shampoo', price: 130.34, frequencyDays: 90, category: 'TOILETRIES', card: 'bpi-gold', lastPurchased: '2025-12-15' },
      { id: 'deo', name: 'Deo', price: 178, frequencyDays: 90, category: 'TOILETRIES', card: 'bpi-gold', lastPurchased: '2025-12-15' },
      { id: 'toothpaste', name: 'Toothpaste', price: 215, frequencyDays: 120, category: 'TOILETRIES', card: 'bpi-gold', lastPurchased: '2025-11-15' },
      { id: 'conditioner', name: 'Conditioner', price: 130.34, frequencyDays: 90, category: 'TOILETRIES', card: 'bpi-gold', lastPurchased: '2025-12-15' },
      { id: 'lactacyd', name: 'Lactacyd', price: 542, frequencyDays: 180, category: 'TOILETRIES', card: 'bpi-gold', lastPurchased: '2025-09-15' },
      { id: 'safeguard', name: 'Safeguard', price: 488, frequencyDays: 180, category: 'TOILETRIES', card: 'bpi-gold', lastPurchased: '2025-09-15' },
      { id: 'milksoap', name: 'Milk Soap', price: 179.03, frequencyDays: 180, category: 'TOILETRIES', card: 'bpi-gold', lastPurchased: '2025-09-15' },
      { id: 'cottonbuds', name: 'Cotton Buds', price: 95, frequencyDays: 90, category: 'TOILETRIES', card: 'bpi-gold', lastPurchased: '2025-12-15' },
      { id: 'cottonpads', name: 'Cotton Pads', price: 99, frequencyDays: 90, category: 'TOILETRIES', card: 'bpi-gold', lastPurchased: '2025-12-15' },
      { id: 'toothbrush', name: 'Tooth Brush', price: 974, frequencyDays: 90, category: 'TOILETRIES', card: 'bpi-gold', lastPurchased: '2025-12-15' },
      { id: 'napkin', name: 'Napkin', price: 535, frequencyDays: 90, category: 'TOILETRIES', card: 'bpi-gold', lastPurchased: '2025-12-15' },
      { id: 'dashing', name: 'Dashing', price: 800, frequencyDays: 30, category: 'TOILETRIES', card: 'bpi-gold', lastPurchased: '2026-03-01' },
      { id: 'haircut', name: 'Haircut', price: 800, frequencyDays: 365, category: 'TOILETRIES', card: 'bpi-gold', lastPurchased: '2025-03-15' },
      { id: 'handwash', name: 'Hand Wash', price: 107.87, frequencyDays: 180, category: 'TOILETRIES', card: 'bpi-gold', lastPurchased: '2025-09-15' },
      { id: 'ariel-liquid', name: 'Ariel Liquid 4-pack', price: 1811, frequencyDays: 30, category: 'HOUSEHOLD', card: 'bpi-gold', lastPurchased: '2026-03-01' },
      { id: 'ariel-powder', name: 'Ariel Powder', price: 561, frequencyDays: 30, category: 'HOUSEHOLD', card: 'bpi-gold', lastPurchased: '2026-03-01' },
      { id: 'downy', name: 'Downy 2-pack', price: 838, frequencyDays: 30, category: 'HOUSEHOLD', card: 'bpi-gold', lastPurchased: '2026-03-01' },
      { id: 'zonrox', name: 'Zonrox', price: 283, frequencyDays: 30, category: 'HOUSEHOLD', card: 'bpi-gold', lastPurchased: '2026-03-01' },
      { id: 'albatross', name: 'Albatross', price: 192, frequencyDays: 30, category: 'HOUSEHOLD', card: 'bpi-gold', lastPurchased: '2026-03-01' },
    ];
  });
  const [editingGroceryId, setEditingGroceryId] = useState(null);
  const [editGroceryData, setEditGroceryData] = useState({});
  const [showAddGrocery, setShowAddGrocery] = useState(false);
  const [addGroceryData, setAddGroceryData] = useState({ name: '', price: '', frequencyDays: '', category: 'VITAMINS', card: 'bpi-gold' });

  // ===== PURCHASES STATE =====
  const [purchases, setPurchases] = useState(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('ml_purchases') : null;
    return stored ? JSON.parse(stored) : [];
  });
  const [newPurchase, setNewPurchase] = useState({ description: '', amount: '', category: 'Food', card: '', date: '2026-03-27', isNecessity: false, necessityItemId: '' });
  const [purchaseFilter, setPurchaseFilter] = useState('all');

  // ===== TRAVEL STATE =====
  const [trips, setTrips] = useState(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('ml_trips') : null;
    if (stored) return JSON.parse(stored);
    return [
      { id: 'shanghai-2026', name: 'Shanghai 2026', destination: 'Shanghai', startDate: '2026-05-01', endDate: '2026-05-15', notes: '', expenses: [] },
    ];
  });
  const [selectedTripId, setSelectedTripId] = useState('shanghai-2026');
  const [showTripForm, setShowTripForm] = useState(false);
  const [tripFormData, setTripFormData] = useState({ name: '', destination: '', startDate: '', endDate: '', notes: '' });
  const [editingTripId, setEditingTripId] = useState(null);
  const [editTripData, setEditTripData] = useState({});
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [expenseFormData, setExpenseFormData] = useState({ description: '', amount: '', category: 'Flight', card: '', paid: false, date: '', notes: '' });
  const [editingExpenseId, setEditingExpenseId] = useState(null);
  const [editExpenseData, setEditExpenseData] = useState({});

  // ===== CALENDAR / PAY CYCLES STATE =====
  const [calendarMonth, setCalendarMonth] = useState(new Date().getMonth());
  const [calendarYear, setCalendarYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState(null);
  const [payCycles, setPayCycles] = useState(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('ml_paycycles') : null;
    if (stored) return JSON.parse(stored);
    return [
      { id: 'pay-2026-03-27', date: '2026-03-27', source: 'Mole Street', amount: 816.54 },
    ];
  });
  const [selectedCycleId, setSelectedCycleId] = useState('pay-2026-03-27');
  const [showAddCycle, setShowAddCycle] = useState(false);
  const [addCycleData, setAddCycleData] = useState({ date: '', source: 'Mole Street', amount: '' });

  // ===== LOCALSTORAGE PERSISTENCE =====
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('ml_cards', JSON.stringify(creditCards));
    }
  }, [creditCards]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('ml_savings', JSON.stringify(savingsAccounts));
    }
  }, [savingsAccounts]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('ml_subscriptions', JSON.stringify(subscriptions));
    }
  }, [subscriptions]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('ml_bills', JSON.stringify(fixedBills));
    }
  }, [fixedBills]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('ml_installments', JSON.stringify(installments));
    }
  }, [installments]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('ml_grocery', JSON.stringify(groceryItems));
    }
  }, [groceryItems]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('ml_purchases', JSON.stringify(purchases));
    }
  }, [purchases]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('ml_trips', JSON.stringify(trips));
    }
  }, [trips]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('ml_paycycles', JSON.stringify(payCycles));
    }
  }, [payCycles]);

  // ===== HELPER FUNCTIONS =====
  const getCardName = (cardId) => creditCards.find(c => c.id === cardId)?.name || cardId;

  const calculatePayoffMonths = (balance, rate, payment) => {
    if (payment <= 0) return Infinity;
    const monthlyRate = Number(rate) / 100 / 12;
    if (monthlyRate === 0) return Math.ceil(Number(balance) / Number(payment));
    return Math.ceil(Math.log(Number(payment) / (Number(payment) - Number(balance) * monthlyRate)) / Math.log(1 + monthlyRate));
  };

  const formatCurrency = (num) => {
    const val = Number(num);
    if (isNaN(val)) return '₱0.00';
    return '₱' + val.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const getFrequencyLabel = (days) => {
    const d = Number(days);
    if (d === 30) return 'monthly';
    if (d === 60) return 'every 2 months';
    if (d === 90) return 'quarterly';
    if (d === 120) return 'every 4 months';
    if (d === 180) return 'every 6 months';
    if (d === 365) return 'yearly';
    return `every ${d} days`;
  };

  const getMonthlyEquivalent = (price, frequencyDays) => {
    const p = Number(price);
    const f = Number(frequencyDays);
    if (f === 0) return 0;
    return p / (f / 30);
  };

  const getNextPurchaseDate = (lastPurchasedStr, frequencyDays) => {
    const last = new Date(lastPurchasedStr);
    const next = new Date(last.getTime() + Number(frequencyDays) * 86400000);
    return next;
  };

  const isOverdue = (nextPurchaseDate) => {
    return nextPurchaseDate <= new Date();
  };

  const getTotalDebt = () => {
    return creditCards.reduce((sum, card) => sum + Number(card.balance), 0);
  };

  const getTotalSavings = () => {
    return savingsAccounts.reduce((sum, acc) => sum + Number(acc.balance), 0);
  };

  const getTotalCreditLimit = () => {
    return creditCards.reduce((sum, card) => sum + Number(card.limit), 0);
  };

  const calculateMonthlyObligations = () => {
    const subTotal = subscriptions.filter(s => s.status === 'Active').reduce((sum, sub) => sum + Number(sub.amount), 0);
    const billTotal = fixedBills.reduce((sum, bill) => sum + Number(bill.amount), 0);
    const instTotal = installments.reduce((sum, inst) => sum + Number(inst.monthlyPayment), 0);
    return Number(subTotal) + Number(billTotal) + Number(instTotal);
  };

  const getInstallmentEndDate = (startDateStr, months) => {
    const start = new Date(startDateStr);
    const end = new Date(start.getFullYear(), start.getMonth() + Number(months), start.getDate());
    return end;
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-PH');
  };

  const calculateDaysLeft = (nextPurchaseDate) => {
    const now = new Date();
    const diff = Math.ceil((nextPurchaseDate - now) / (1000 * 60 * 60 * 24));
    return Math.max(0, diff);
  };

  const groupGroceryByCategory = () => {
    const grouped = {
      VITAMINS: [],
      SKINCARE: [],
      TOILETRIES: [],
      HOUSEHOLD: [],
    };
    groceryItems.forEach(item => {
      if (grouped[item.category]) grouped[item.category].push(item);
    });
    return grouped;
  };

  const getCategoryItemsDue = (category) => {
    const items = groceryItems.filter(i => i.category === category);
    return items.filter(i => isOverdue(getNextPurchaseDate(i.lastPurchased, i.frequencyDays))).length;
  };

  const getCategoryMonthlyTotal = (category) => {
    const items = groceryItems.filter(i => i.category === category);
    return items.reduce((sum, item) => sum + getMonthlyEquivalent(item.price, item.frequencyDays), 0);
  };

  // ===== COMPUTED CHART DATA =====
  // Category Pie Chart
  const categoryData = Object.entries(
    purchases.reduce((acc, p) => {
      acc[p.category] = (acc[p.category] || 0) + Number(p.amount);
      return acc;
    }, {})
  ).map(([name, value]) => ({name, value}));
  const COLORS = ['#f48fb1', '#ce93d8', '#90caf9', '#80cbc4', '#a5d6a7', '#fff59d', '#ffab91', '#bcaaa4'];

  // Card Pie Chart
  const cardData = Object.entries(
    purchases.reduce((acc, p) => {
      const cardName = p.card === 'cash' ? 'Cash' : creditCards.find(c => c.id === p.card)?.name || p.card;
      acc[cardName] = (acc[cardName] || 0) + Number(p.amount);
      return acc;
    }, {})
  ).map(([name, value]) => ({name, value}));

  // Monthly Bar Chart
  const monthlyData = Object.entries(
    purchases.reduce((acc, p) => {
      const month = p.date.substring(0, 7);
      acc[month] = (acc[month] || 0) + Number(p.amount);
      return acc;
    }, {})
  )
    .sort()
    .map(([month, amount]) => ({
      month: new Date(month + '-01').toLocaleDateString('en-US', {year: 'numeric', month: 'short'}),
      amount
    }));

  // ===== COMPUTED TRAVEL DATA =====
  const selectedTrip = trips.find(t => t.id === selectedTripId);

  // ===== COMPUTED CALENDAR DATA =====
  const firstDay = new Date(calendarYear, calendarMonth, 1).getDay();
  const daysInMonth = new Date(calendarYear, calendarMonth + 1, 0).getDate();
  const calendarDays = [];
  for (let i = 0; i < firstDay; i++) calendarDays.push(null);
  for (let i = 1; i <= daysInMonth; i++) calendarDays.push(i);

  // ===== COMPUTED PAY CYCLE DATA =====
  const selectedCycle = selectedCycleId ? payCycles.find(c => c.id === selectedCycleId) : null;

  // ===== COMPUTED TOTAL LEFT FOR CYCLE =====
  const totalPayments = selectedCycle ? selectedCycle.payments.reduce((s, p) => s + (Number(p.amount) || 0), 0) : 0;
  const totalBills = selectedCycle ? selectedCycle.billPayments.reduce((s, b) => s + (Number(b.amount) || 0), 0) : 0;
  const withdrawals = selectedCycle ? Number(selectedCycle.cashExpenses.withdrawals) || 0 : 0;
  const fees = selectedCycle ? Number(selectedCycle.cashExpenses.fees) || 0 : 0;
  const deposits = selectedCycle ? Number(selectedCycle.inboundCash.deposits) || 0 : 0;
  const refunds = selectedCycle ? Number(selectedCycle.inboundCash.refunds) || 0 : 0;
  const totalLeft = selectedCycle ? Number(selectedCycle.amount) - totalPayments - totalBills - withdrawals - fees + deposits + refunds : 0;
  const totalForecastedDebt = selectedCycle ? creditCards.reduce(function(s, card) {
    var pmt = selectedCycle.payments.find(function(p) { return p.cardId === card.id; });
    var pmtAmt = Number(pmt && pmt.amount ? pmt.amount : 0) || 0;
    return s + Math.max(0, Number(card.balance) - pmtAmt);
  }, 0) : 0;

  // ===== RETURN & TAB NAVIGATION =====
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 p-4 md:p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">MyLedger</h1>
        <p className="text-gray-600">Financial Management & Tracking System</p>
      </div>

      {/* Tab Navigation */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="flex gap-2 flex-wrap border-b border-gray-300">
          {[['dashboard','Dashboard'], ['creditcards','Credit Cards'], ['installments','Installments'], ['grocery','Grocery'], ['purchases','Purchases'], ['travel','Travel'], ['calendar','Calendar']].map(([tab, label]) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-semibold transition-colors ${
                activeTab === tab
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-blue-500'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* TAB CONTENT */}
      <div className="max-w-7xl mx-auto">

        {/* ===== DASHBOARD TAB ===== */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Real-time Clock */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {new Date().toLocaleTimeString('en-PH')}
              </h2>
              <p className="text-gray-600">{new Date().toLocaleDateString('en-PH', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>

            {/* Income Forecast */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Income Forecast</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b pb-3">
                  <span className="font-semibold text-gray-700">Mole Street (Biweekly)</span>
                  <span className="text-lg font-bold text-green-600">{formatCurrency(Number(816.54) * Number(exchangeRate))}</span>
                </div>
                <div className="flex justify-between items-center border-b pb-3">
                  <span className="font-semibold text-gray-700">Archy (Monthly)</span>
                  <span className="text-lg font-bold text-green-600">{formatCurrency(Number(1550) * Number(exchangeRate))}</span>
                </div>
                <div className="flex items-center gap-2 mt-4">
                  <label className="text-gray-700 font-semibold">Exchange Rate:</label>
                  <input
                    type="text"
                    inputMode="decimal"
                    value={exchangeRate}
                    onChange={(e) => setExchangeRate(Number(e.target.value) || 57)}
                    className="border border-gray-300 rounded px-2 py-1 w-24"
                    placeholder="57"
                  />
                  <span className="text-gray-600">PHP/USD</span>
                </div>
              </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-red-50 rounded-lg shadow-md p-6 border-l-4 border-red-400">
                <p className="text-gray-600 font-semibold mb-2">Total Debt</p>
                <p className="text-3xl font-bold text-red-600">{formatCurrency(getTotalDebt())}</p>
              </div>
              <div className="bg-green-50 rounded-lg shadow-md p-6 border-l-4 border-green-400">
                <p className="text-gray-600 font-semibold mb-2">Total Savings</p>
                <p className="text-3xl font-bold text-green-600">{formatCurrency(getTotalSavings())}</p>
              </div>
              <div className="bg-blue-50 rounded-lg shadow-md p-6 border-l-4 border-blue-400">
                <p className="text-gray-600 font-semibold mb-2">Credit Utilization</p>
                <p className="text-3xl font-bold text-blue-600">{((getTotalDebt() / getTotalCreditLimit()) * 100).toFixed(1)}%</p>
              </div>
            </div>

            {/* Monthly Obligations */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Monthly Obligations</h3>
              <p className="text-2xl font-bold text-orange-600">{formatCurrency(calculateMonthlyObligations())}</p>
              <div className="mt-4 text-sm text-gray-600 space-y-1">
                <p>Subscriptions: {formatCurrency(subscriptions.filter(s => s.status === 'Active').reduce((sum, sub) => sum + Number(sub.amount), 0))}</p>
                <p>Fixed Bills: {formatCurrency(fixedBills.reduce((sum, bill) => sum + Number(bill.amount), 0))}</p>
                <p>Installments: {formatCurrency(installments.reduce((sum, inst) => sum + Number(inst.monthlyPayment), 0))}</p>
              </div>
            </div>

            {/* Savings Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">Savings Accounts</h3>
                <button
                  onClick={() => setShowAddSavings(!showAddSavings)}
                  className="bg-green-100 text-green-700 px-3 py-1 rounded font-semibold"
                >
                  + Add
                </button>
              </div>
              {showAddSavings && (
                <div className="bg-gray-50 p-4 rounded mb-4 space-y-3">
                  <input
                    type="text"
                    placeholder="Account Name"
                    value={addSavingsData.name}
                    onChange={(e) => setAddSavingsData({...addSavingsData, name: e.target.value})}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                  <input
                    type="text"
                    inputMode="decimal"
                    placeholder="Balance"
                    value={addSavingsData.balance}
                    onChange={(e) => setAddSavingsData({...addSavingsData, balance: e.target.value})}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                  <button
                    onClick={() => {
                      setSavingsAccounts([...savingsAccounts, {...addSavingsData, id: 'sav-' + Date.now()}]);
                      setAddSavingsData({name: '', balance: ''});
                      setShowAddSavings(false);
                    }}
                    className="bg-green-100 text-green-700 px-4 py-2 rounded font-semibold"
                  >
                    Save
                  </button>
                </div>
              )}
              <div className="space-y-3">
                {savingsAccounts.map(acc => (
                  <div key={acc.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    {editingSavingsId === acc.id ? (
                      <div className="flex gap-2 flex-1">
                        <input
                          type="text"
                          value={editSavingsData.name || ''}
                          onChange={(e) => setEditSavingsData({...editSavingsData, name: e.target.value})}
                          className="border border-gray-300 rounded px-2 py-1 flex-1"
                          placeholder="Name"
                        />
                        <input
                          type="text"
                          inputMode="decimal"
                          value={editSavingsData.balance || ''}
                          onChange={(e) => setEditSavingsData({...editSavingsData, balance: e.target.value})}
                          className="border border-gray-300 rounded px-2 py-1 flex-1"
                          placeholder="Balance"
                        />
                        <button
                          onClick={() => {
                            setSavingsAccounts(savingsAccounts.map(a => a.id === acc.id ? {...a, ...editSavingsData} : a));
                            setEditingSavingsId(null);
                          }}
                          className="bg-green-100 text-green-700 px-3 py-1 rounded font-semibold"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingSavingsId(null)}
                          className="bg-gray-100 text-gray-500 px-3 py-1 rounded font-semibold"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <>
                        <div>
                          <p className="font-semibold text-gray-800">{acc.name}</p>
                          <p className="text-gray-600">{formatCurrency(acc.balance)}</p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setEditingSavingsId(acc.id);
                              setEditSavingsData(acc);
                            }}
                            className="bg-blue-100 text-blue-600 px-3 py-1 rounded font-semibold"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => setSavingsAccounts(savingsAccounts.filter(a => a.id !== acc.id))}
                            className="bg-pink-100 text-pink-600 px-3 py-1 rounded font-semibold"
                          >
                            Delete
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Subscriptions Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">Subscriptions</h3>
                <button
                  onClick={() => setShowAddSub(!showAddSub)}
                  className="bg-green-100 text-green-700 px-3 py-1 rounded font-semibold"
                >
                  + Add
                </button>
              </div>
              {showAddSub && (
                <div className="bg-gray-50 p-4 rounded mb-4 space-y-3">
                  <input
                    type="text"
                    placeholder="Subscription Name"
                    value={addSubData.name}
                    onChange={(e) => setAddSubData({...addSubData, name: e.target.value})}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                  <input
                    type="text"
                    inputMode="decimal"
                    placeholder="Amount"
                    value={addSubData.amount}
                    onChange={(e) => setAddSubData({...addSubData, amount: e.target.value})}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="Day of Month"
                    value={addSubData.day}
                    onChange={(e) => setAddSubData({...addSubData, day: e.target.value})}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                  <select
                    value={addSubData.card}
                    onChange={(e) => setAddSubData({...addSubData, card: e.target.value})}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  >
                    <option value="">Select Card</option>
                    {creditCards.map(card => (
                      <option key={card.id} value={card.id}>{card.name}</option>
                    ))}
                  </select>
                  <button
                    onClick={() => {
                      setSubscriptions([...subscriptions, {...addSubData, id: 'sub-' + Date.now(), status: 'Active'}]);
                      setAddSubData({name: '', amount: '', day: '', card: '', status: 'Active'});
                      setShowAddSub(false);
                    }}
                    className="bg-green-100 text-green-700 px-4 py-2 rounded font-semibold"
                  >
                    Save
                  </button>
                </div>
              )}
              <div className="space-y-3">
                {subscriptions.map(sub => (
                  <div key={sub.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    {editingSubId === sub.id ? (
                      <div className="flex gap-2 flex-1">
                        <input
                          type="text"
                          value={editSubData.name || ''}
                          onChange={(e) => setEditSubData({...editSubData, name: e.target.value})}
                          className="border border-gray-300 rounded px-2 py-1 flex-1"
                          placeholder="Name"
                        />
                        <input
                          type="text"
                          inputMode="decimal"
                          value={editSubData.amount || ''}
                          onChange={(e) => setEditSubData({...editSubData, amount: e.target.value})}
                          className="border border-gray-300 rounded px-2 py-1 flex-1"
                          placeholder="Amount"
                        />
                        <input
                          type="text"
                          inputMode="numeric"
                          value={editSubData.day || ''}
                          onChange={(e) => setEditSubData({...editSubData, day: e.target.value})}
                          className="border border-gray-300 rounded px-2 py-1 flex-1"
                          placeholder="Day"
                        />
                        <select
                          value={editSubData.card || ''}
                          onChange={(e) => setEditSubData({...editSubData, card: e.target.value})}
                          className="border border-gray-300 rounded px-2 py-1 flex-1"
                        >
                          <option value="">Select Card</option>
                          {creditCards.map(card => (
                            <option key={card.id} value={card.id}>{card.name}</option>
                          ))}
                        </select>
                        <button
                          onClick={() => {
                            setSubscriptions(subscriptions.map(s => s.id === sub.id ? {...s, ...editSubData} : s));
                            setEditingSubId(null);
                          }}
                          className="bg-green-100 text-green-700 px-3 py-1 rounded font-semibold"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingSubId(null)}
                          className="bg-gray-100 text-gray-500 px-3 py-1 rounded font-semibold"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <>
                        <div>
                          <p className="font-semibold text-gray-800">{sub.name}</p>
                          <p className="text-gray-600">{formatCurrency(sub.amount)} on day {sub.day} via {getCardName(sub.card)}</p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setEditingSubId(sub.id);
                              setEditSubData(sub);
                            }}
                            className="bg-blue-100 text-blue-600 px-3 py-1 rounded font-semibold"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => setSubscriptions(subscriptions.filter(s => s.id !== sub.id))}
                            className="bg-pink-100 text-pink-600 px-3 py-1 rounded font-semibold"
                          >
                            Delete
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Fixed Bills Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">Fixed Bills</h3>
                <button
                  onClick={() => setShowAddBill(!showAddBill)}
                  className="bg-green-100 text-green-700 px-3 py-1 rounded font-semibold"
                >
                  + Add
                </button>
              </div>
              {showAddBill && (
                <div className="bg-gray-50 p-4 rounded mb-4 space-y-3">
                  <input
                    type="text"
                    placeholder="Bill Name"
                    value={addBillData.name}
                    onChange={(e) => setAddBillData({...addBillData, name: e.target.value})}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                  <input
                    type="text"
                    inputMode="decimal"
                    placeholder="Amount"
                    value={addBillData.amount}
                    onChange={(e) => setAddBillData({...addBillData, amount: e.target.value})}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="Day of Month"
                    value={addBillData.day}
                    onChange={(e) => setAddBillData({...addBillData, day: e.target.value})}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                  <button
                    onClick={() => {
                      setFixedBills([...fixedBills, {...addBillData, id: 'bill-' + Date.now()}]);
                      setAddBillData({name: '', amount: '', day: ''});
                      setShowAddBill(false);
                    }}
                    className="bg-green-100 text-green-700 px-4 py-2 rounded font-semibold"
                  >
                    Save
                  </button>
                </div>
              )}
              <div className="space-y-3">
                {fixedBills.map(bill => (
                  <div key={bill.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    {editingBillId === bill.id ? (
                      <div className="flex gap-2 flex-1">
                        <input
                          type="text"
                          value={editBillData.name || ''}
                          onChange={(e) => setEditBillData({...editBillData, name: e.target.value})}
                          className="border border-gray-300 rounded px-2 py-1 flex-1"
                          placeholder="Name"
                        />
                        <input
                          type="text"
                          inputMode="decimal"
                          value={editBillData.amount || ''}
                          onChange={(e) => setEditBillData({...editBillData, amount: e.target.value})}
                          className="border border-gray-300 rounded px-2 py-1 flex-1"
                          placeholder="Amount"
                        />
                        <input
                          type="text"
                          inputMode="numeric"
                          value={editBillData.day || ''}
                          onChange={(e) => setEditBillData({...editBillData, day: e.target.value})}
                          className="border border-gray-300 rounded px-2 py-1 flex-1"
                          placeholder="Day"
                        />
                        <button
                          onClick={() => {
                            setFixedBills(fixedBills.map(b => b.id === bill.id ? {...b, ...editBillData} : b));
                            setEditingBillId(null);
                          }}
                          className="bg-green-100 text-green-700 px-3 py-1 rounded font-semibold"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingBillId(null)}
                          className="bg-gray-100 text-gray-500 px-3 py-1 rounded font-semibold"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <>
                        <div>
                          <p className="font-semibold text-gray-800">{bill.name}</p>
                          <p className="text-gray-600">{formatCurrency(bill.amount)} on day {bill.day}</p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setEditingBillId(bill.id);
                              setEditBillData(bill);
                            }}
                            className="bg-blue-100 text-blue-600 px-3 py-1 rounded font-semibold"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => setFixedBills(fixedBills.filter(b => b.id !== bill.id))}
                            className="bg-pink-100 text-pink-600 px-3 py-1 rounded font-semibold"
                          >
                            Delete
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Installments Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">Installments</h3>
                <button
                  onClick={() => setShowAddInstallment(!showAddInstallment)}
                  className="bg-green-100 text-green-700 px-3 py-1 rounded font-semibold"
                >
                  + Add
                </button>
              </div>
              {showAddInstallment && (
                <div className="bg-gray-50 p-4 rounded mb-4 space-y-3">
                  <input
                    type="text"
                    placeholder="Item Name"
                    value={addInstallmentData.name}
                    onChange={(e) => setAddInstallmentData({...addInstallmentData, name: e.target.value})}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                  <input
                    type="text"
                    inputMode="decimal"
                    placeholder="Total Amount"
                    value={addInstallmentData.totalAmount}
                    onChange={(e) => setAddInstallmentData({...addInstallmentData, totalAmount: e.target.value})}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                  <input
                    type="text"
                    inputMode="decimal"
                    placeholder="Monthly Payment"
                    value={addInstallmentData.monthlyPayment}
                    onChange={(e) => setAddInstallmentData({...addInstallmentData, monthlyPayment: e.target.value})}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="Number of Months"
                    value={addInstallmentData.months}
                    onChange={(e) => setAddInstallmentData({...addInstallmentData, months: e.target.value})}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                  <input
                    type="text"
                    placeholder="Start Date (YYYY-MM-DD)"
                    value={addInstallmentData.startDate}
                    onChange={(e) => setAddInstallmentData({...addInstallmentData, startDate: e.target.value})}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                  <select
                    value={addInstallmentData.card}
                    onChange={(e) => setAddInstallmentData({...addInstallmentData, card: e.target.value})}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  >
                    <option value="">Select Card</option>
                    {creditCards.map(card => (
                      <option key={card.id} value={card.id}>{card.name}</option>
                    ))}
                  </select>
                  <input
                    type="text"
                    inputMode="decimal"
                    placeholder="Remaining Balance"
                    value={addInstallmentData.remainingBalance}
                    onChange={(e) => setAddInstallmentData({...addInstallmentData, remainingBalance: e.target.value})}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                  <button
                    onClick={() => {
                      setInstallments([...installments, {...addInstallmentData, id: 'inst-' + Date.now(), paidThisMonth: false}]);
                      setAddInstallmentData({name: '', totalAmount: '', monthlyPayment: '', months: '', startDate: '', card: '', remainingBalance: ''});
                      setShowAddInstallment(false);
                    }}
                    className="bg-green-100 text-green-700 px-4 py-2 rounded font-semibold"
                  >
                    Save
                  </button>
                </div>
              )}
              <div className="space-y-4">
                {installments.map(inst => {
                  const endDate = getInstallmentEndDate(inst.startDate, inst.months);
                  const progress = ((Number(inst.totalAmount) - Number(inst.remainingBalance)) / Number(inst.totalAmount)) * 100;
                  return (
                    <div key={inst.id} className="p-4 bg-gray-50 rounded">
                      <div className="flex justify-between items-center mb-2">
                        <div>
                          <p className="font-semibold text-gray-800">{inst.name}</p>
                          <p className="text-sm text-gray-600">{getCardName(inst.card)}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-800">{formatCurrency(inst.monthlyPayment)}/mo</p>
                          <p className="text-sm text-gray-600">Remaining: {formatCurrency(inst.remainingBalance)}</p>
                        </div>
                      </div>
                      <div className="w-full bg-gray-300 rounded-full h-2 mb-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{width: `${Math.min(progress, 100)}%`}}></div>
                      </div>
                      <p className="text-xs text-gray-600 mb-3">Ends: {formatDate(endDate.toISOString().split('T')[0])}</p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setInstallments(installments.map(i => i.id === inst.id ? {...i, paidThisMonth: true} : i));
                          }}
                          disabled={inst.paidThisMonth}
                          className={`px-3 py-1 rounded font-semibold ${inst.paidThisMonth ? 'bg-gray-300 text-gray-600' : 'bg-green-100 text-green-700'}`}
                        >
                          {inst.paidThisMonth ? 'Paid ✓' : 'Mark Paid'}
                        </button>
                        {inst.paidThisMonth && (
                          <button
                            onClick={() => {
                              setInstallments(installments.map(i => i.id === inst.id ? {...i, paidThisMonth: false} : i));
                            }}
                            className="bg-gray-100 text-gray-500 px-3 py-1 rounded font-semibold"
                          >
                            Reset
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ===== CREDIT CARDS TAB ===== */}
        {activeTab === 'creditcards' && (
          <div className="space-y-6">
            <div className="flex justify-end mb-4">
              <button
                onClick={() => setShowAddCard(!showAddCard)}
                className="bg-green-100 text-green-700 px-4 py-2 rounded font-semibold"
              >
                + Add Card
              </button>
            </div>
            {showAddCard && (
              <div className="bg-white rounded-lg shadow-md p-6 space-y-3 mb-6">
                <input
                  type="text"
                  placeholder="Card Name"
                  value={addCardData.name}
                  onChange={(e) => setAddCardData({...addCardData, name: e.target.value})}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
                <input
                  type="text"
                  inputMode="decimal"
                  placeholder="Balance"
                  value={addCardData.balance}
                  onChange={(e) => setAddCardData({...addCardData, balance: e.target.value})}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
                <input
                  type="text"
                  inputMode="decimal"
                  placeholder="Interest Rate (%)"
                  value={addCardData.rate}
                  onChange={(e) => setAddCardData({...addCardData, rate: e.target.value})}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
                <input
                  type="text"
                  inputMode="decimal"
                  placeholder="Credit Limit"
                  value={addCardData.limit}
                  onChange={(e) => setAddCardData({...addCardData, limit: e.target.value})}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
                <input
                  type="text"
                  inputMode="decimal"
                  placeholder="Min Payment"
                  value={addCardData.minPayment}
                  onChange={(e) => setAddCardData({...addCardData, minPayment: e.target.value})}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="Statement Day"
                  value={addCardData.statementDay}
                  onChange={(e) => setAddCardData({...addCardData, statementDay: e.target.value})}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="Days to Due"
                  value={addCardData.daysToDue}
                  onChange={(e) => setAddCardData({...addCardData, daysToDue: e.target.value})}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setCreditCards([...creditCards, {...addCardData, id: 'card-' + Date.now(), paymentHistory: []}]);
                      setAddCardData({name: '', balance: '', rate: '', limit: '', minPayment: '', statementDay: '', daysToDue: ''});
                      setShowAddCard(false);
                    }}
                    className="flex-1 bg-green-100 text-green-700 px-4 py-2 rounded font-semibold"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setShowAddCard(false)}
                    className="flex-1 bg-gray-100 text-gray-500 px-4 py-2 rounded font-semibold"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {creditCards.map(card => {
                const utilization = (Number(card.balance) / Number(card.limit)) * 100;
                const minPayoffMonths = calculatePayoffMonths(card.balance, card.rate, card.minPayment);
                const suggestedPayment = Number(card.balance) / 12;
                const suggestedPayoffMonths = calculatePayoffMonths(card.balance, card.rate, suggestedPayment);
                return (
                  <div key={card.id} className="bg-white rounded-lg shadow-md p-6">
                    {editingCardId === card.id ? (
                      <div className="space-y-3">
                        <input
                          type="text"
                          value={editCardData.name || ''}
                          onChange={(e) => setEditCardData({...editCardData, name: e.target.value})}
                          className="w-full border border-gray-300 rounded px-3 py-2"
                          placeholder="Card Name"
                        />
                        <input
                          type="text"
                          inputMode="decimal"
                          value={editCardData.balance || ''}
                          onChange={(e) => setEditCardData({...editCardData, balance: e.target.value})}
                          className="w-full border border-gray-300 rounded px-3 py-2"
                          placeholder="Balance"
                        />
                        <input
                          type="text"
                          inputMode="decimal"
                          value={editCardData.rate || ''}
                          onChange={(e) => setEditCardData({...editCardData, rate: e.target.value})}
                          className="w-full border border-gray-300 rounded px-3 py-2"
                          placeholder="Rate"
                        />
                        <input
                          type="text"
                          inputMode="decimal"
                          value={editCardData.limit || ''}
                          onChange={(e) => setEditCardData({...editCardData, limit: e.target.value})}
                          className="w-full border border-gray-300 rounded px-3 py-2"
                          placeholder="Limit"
                        />
                        <input
                          type="text"
                          inputMode="decimal"
                          value={editCardData.minPayment || ''}
                          onChange={(e) => setEditCardData({...editCardData, minPayment: e.target.value})}
                          className="w-full border border-gray-300 rounded px-3 py-2"
                          placeholder="Min Payment"
                        />
                        <input
                          type="text"
                          inputMode="numeric"
                          value={editCardData.statementDay || ''}
                          onChange={(e) => setEditCardData({...editCardData, statementDay: e.target.value})}
                          className="w-full border border-gray-300 rounded px-3 py-2"
                          placeholder="Statement Day"
                        />
                        <input
                          type="text"
                          inputMode="numeric"
                          value={editCardData.daysToDue || ''}
                          onChange={(e) => setEditCardData({...editCardData, daysToDue: e.target.value})}
                          className="w-full border border-gray-300 rounded px-3 py-2"
                          placeholder="Days to Due"
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setCreditCards(creditCards.map(c => c.id === card.id ? {...c, ...editCardData} : c));
                              setEditingCardId(null);
                            }}
                            className="flex-1 bg-green-100 text-green-700 px-3 py-2 rounded font-semibold"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingCardId(null)}
                            className="flex-1 bg-gray-100 text-gray-500 px-3 py-2 rounded font-semibold"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <h3 className="text-lg font-bold text-gray-800 mb-4">{card.name}</h3>
                        <div className="mb-4 space-y-2">
                          <p className="text-2xl font-bold text-gray-900">{formatCurrency(card.balance)}</p>
                          <p className="text-sm text-gray-600">Limit: {formatCurrency(card.limit)}</p>
                          <p className="text-sm text-gray-600">Rate: {card.rate}%</p>
                          <p className="text-sm text-gray-600">Min Payment: {formatCurrency(card.minPayment)}</p>
                          <p className="text-sm text-gray-600">Statement Day: {card.statementDay}, Due in {card.daysToDue} days</p>
                        </div>
                        <div className="mb-4">
                          <p className="text-sm font-semibold text-gray-700 mb-1">Utilization: {utilization.toFixed(1)}%</p>
                          <div className="w-full bg-gray-300 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${utilization > 80 ? 'bg-red-600' : utilization > 50 ? 'bg-orange-600' : 'bg-green-600'}`}
                              style={{width: `${Math.min(utilization, 100)}%`}}
                            ></div>
                          </div>
                        </div>
                        <div className="mb-4 bg-blue-50 p-3 rounded">
                          <p className="text-xs font-semibold text-gray-700 mb-1">Min Payment Payoff: {minPayoffMonths === Infinity ? 'Never' : `${minPayoffMonths} months`}</p>
                          <p className="text-xs text-gray-600">Monthly: {formatCurrency(card.minPayment)}</p>
                        </div>
                        <div className="mb-4 bg-green-50 p-3 rounded">
                          <p className="text-xs font-semibold text-gray-700 mb-1">Suggested Payoff: {suggestedPayoffMonths === Infinity ? 'Never' : `${suggestedPayoffMonths} months`}</p>
                          <p className="text-xs text-gray-600">Monthly: {formatCurrency(suggestedPayment)}</p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setEditingCardId(card.id);
                              setEditCardData(card);
                            }}
                            className="flex-1 bg-blue-100 text-blue-600 px-3 py-2 rounded font-semibold text-sm"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => setLoggingPaymentCardId(card.id)}
                            className="flex-1 bg-green-100 text-green-700 px-3 py-2 rounded font-semibold text-sm"
                          >
                            Log Payment
                          </button>
                          <button
                            onClick={() => setCreditCards(creditCards.filter(c => c.id !== card.id))}
                            className="flex-1 bg-pink-100 text-pink-600 px-3 py-2 rounded font-semibold text-sm"
                          >
                            Delete
                          </button>
                        </div>
                        {loggingPaymentCardId === card.id && (
                          <div className="mt-4 bg-gray-50 p-4 rounded space-y-3">
                            <input
                              type="text"
                              inputMode="decimal"
                              placeholder="Payment Amount"
                              value={paymentFormData.amount}
                              onChange={(e) => setPaymentFormData({...paymentFormData, amount: e.target.value})}
                              className="w-full border border-gray-300 rounded px-3 py-2"
                            />
                            <input
                              type="text"
                              placeholder="Payment Date (YYYY-MM-DD)"
                              value={paymentFormData.date}
                              onChange={(e) => setPaymentFormData({...paymentFormData, date: e.target.value})}
                              className="w-full border border-gray-300 rounded px-3 py-2"
                            />
                            <div className="flex gap-2">
                              <button
                                onClick={() => {
                                  const amount = Number(paymentFormData.amount);
                                  setCreditCards(creditCards.map(c =>
                                    c.id === card.id
                                      ? {
                                          ...c,
                                          balance: Math.max(0, Number(c.balance) - amount),
                                          paymentHistory: [...(c.paymentHistory || []), {date: paymentFormData.date, amount}]
                                        }
                                      : c
                                  ));
                                  setPaymentFormData({amount: '', date: ''});
                                  setLoggingPaymentCardId(null);
                                }}
                                className="flex-1 bg-green-100 text-green-700 px-3 py-2 rounded font-semibold"
                              >
                                Save
                              </button>
                              <button
                                onClick={() => {
                                  setPaymentFormData({amount: '', date: ''});
                                  setLoggingPaymentCardId(null);
                                }}
                                className="flex-1 bg-gray-100 text-gray-500 px-3 py-2 rounded font-semibold"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        )}
                        {card.paymentHistory && card.paymentHistory.length > 0 && (
                          <div className="mt-4">
                            <button
                              onClick={() => setShowPaymentHistory(showPaymentHistory === card.id ? null : card.id)}
                              className="text-blue-600 text-sm font-semibold"
                            >
                              {showPaymentHistory === card.id ? 'Hide' : 'Show'} Payment History
                            </button>
                            {showPaymentHistory === card.id && (
                              <div className="mt-2 bg-gray-50 p-3 rounded max-h-48 overflow-y-auto">
                                {card.paymentHistory.map((payment, idx) => (
                                  <div key={idx} className="text-sm text-gray-700 mb-1">
                                    {formatDate(payment.date)}: {formatCurrency(payment.amount)}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ===== INSTALLMENTS TAB ===== */}
        {activeTab === 'installments' && (
          <div className="space-y-6">
            <div className="flex justify-end mb-4">
              <button
                onClick={() => setShowAddInstallment(!showAddInstallment)}
                className="bg-green-100 text-green-700 px-4 py-2 rounded font-semibold"
              >
                + Add Installment
              </button>
            </div>
            {showAddInstallment && (
              <div className="bg-white rounded-lg shadow-md p-6 space-y-3 mb-6">
                <input
                  type="text"
                  placeholder="Item Name"
                  value={addInstallmentData.name}
                  onChange={(e) => setAddInstallmentData({...addInstallmentData, name: e.target.value})}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
                <input
                  type="text"
                  inputMode="decimal"
                  placeholder="Total Amount"
                  value={addInstallmentData.totalAmount}
                  onChange={(e) => setAddInstallmentData({...addInstallmentData, totalAmount: e.target.value})}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
                <input
                  type="text"
                  inputMode="decimal"
                  placeholder="Monthly Payment"
                  value={addInstallmentData.monthlyPayment}
                  onChange={(e) => setAddInstallmentData({...addInstallmentData, monthlyPayment: e.target.value})}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="Number of Months"
                  value={addInstallmentData.months}
                  onChange={(e) => setAddInstallmentData({...addInstallmentData, months: e.target.value})}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
                <input
                  type="text"
                  placeholder="Start Date (YYYY-MM-DD)"
                  value={addInstallmentData.startDate}
                  onChange={(e) => setAddInstallmentData({...addInstallmentData, startDate: e.target.value})}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
                <select
                  value={addInstallmentData.card}
                  onChange={(e) => setAddInstallmentData({...addInstallmentData, card: e.target.value})}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                >
                  <option value="">Select Card</option>
                  {creditCards.map(card => (
                    <option key={card.id} value={card.id}>{card.name}</option>
                  ))}
                </select>
                <input
                  type="text"
                  inputMode="decimal"
                  placeholder="Remaining Balance"
                  value={addInstallmentData.remainingBalance}
                  onChange={(e) => setAddInstallmentData({...addInstallmentData, remainingBalance: e.target.value})}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setInstallments([...installments, {...addInstallmentData, id: 'inst-' + Date.now(), paidThisMonth: false}]);
                      setAddInstallmentData({name: '', totalAmount: '', monthlyPayment: '', months: '', startDate: '', card: '', remainingBalance: ''});
                      setShowAddInstallment(false);
                    }}
                    className="flex-1 bg-green-100 text-green-700 px-4 py-2 rounded font-semibold"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setShowAddInstallment(false)}
                    className="flex-1 bg-gray-100 text-gray-500 px-4 py-2 rounded font-semibold"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {installments.map(inst => {
                const endDate = getInstallmentEndDate(inst.startDate, inst.months);
                const progress = ((Number(inst.totalAmount) - Number(inst.remainingBalance)) / Number(inst.totalAmount)) * 100;
                return (
                  <div key={inst.id} className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-3">{inst.name}</h3>
                    <div className="space-y-2 mb-4">
                      <p className="text-sm text-gray-700">Card: {getCardName(inst.card)}</p>
                      <p className="text-sm text-gray-700">Monthly: {formatCurrency(inst.monthlyPayment)}</p>
                      <p className="text-sm text-gray-700">Remaining: {formatCurrency(inst.remainingBalance)}</p>
                      <p className="text-sm text-gray-700">Ends: {formatDate(endDate.toISOString().split('T')[0])}</p>
                    </div>
                    <div className="mb-4">
                      <p className="text-xs text-gray-600 mb-1">Progress: {progress.toFixed(1)}%</p>
                      <div className="w-full bg-gray-300 rounded-full h-3">
                        <div className="bg-blue-600 h-3 rounded-full" style={{width: `${Math.min(progress, 100)}%`}}></div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setInstallments(installments.map(i => i.id === inst.id ? {...i, paidThisMonth: true} : i));
                        }}
                        disabled={inst.paidThisMonth}
                        className={`flex-1 px-3 py-2 rounded font-semibold text-sm ${inst.paidThisMonth ? 'bg-gray-300 text-gray-600' : 'bg-green-100 text-green-700'}`}
                      >
                        {inst.paidThisMonth ? 'Paid ✓' : 'Mark Paid'}
                      </button>
                      {inst.paidThisMonth && (
                        <button
                          onClick={() => {
                            setInstallments(installments.map(i => i.id === inst.id ? {...i, paidThisMonth: false} : i));
                          }}
                          className="flex-1 bg-gray-100 text-gray-500 px-3 py-2 rounded font-semibold text-sm"
                        >
                          Reset
                        </button>
                      )}
                      <button
                        onClick={() => setInstallments(installments.filter(i => i.id !== inst.id))}
                        className="flex-1 bg-pink-100 text-pink-600 px-3 py-2 rounded font-semibold text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ===== GROCERY TAB ===== */}
        {activeTab === 'grocery' && (
          <div className="space-y-8">
            {Object.entries(groupGroceryByCategory()).map(([category, items]) => {
              const categoryTotal = getCategoryMonthlyTotal(category);
              const itemsDue = getCategoryItemsDue(category);
              return (
                <div key={category} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">{category}</h3>
                      <p className="text-sm text-gray-600">Monthly Equiv: {formatCurrency(categoryTotal)} | {itemsDue} items due</p>
                    </div>
                    <button
                      onClick={() => {
                        setShowAddGrocery(showAddGrocery === category ? null : category);
                        setAddGroceryData({name: '', price: '', frequencyDays: '', category, card: 'bpi-gold'});
                      }}
                      className="bg-green-100 text-green-700 px-3 py-1 rounded font-semibold text-sm"
                    >
                      + Add
                    </button>
                  </div>
                  {showAddGrocery === category && (
                    <div className="bg-gray-50 p-4 rounded mb-4 space-y-3">
                      <input
                        type="text"
                        placeholder="Item Name"
                        value={addGroceryData.name}
                        onChange={(e) => setAddGroceryData({...addGroceryData, name: e.target.value})}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                      />
                      <input
                        type="text"
                        inputMode="decimal"
                        placeholder="Price"
                        value={addGroceryData.price}
                        onChange={(e) => setAddGroceryData({...addGroceryData, price: e.target.value})}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                      />
                      <input
                        type="text"
                        inputMode="numeric"
                        placeholder="Frequency (days)"
                        value={addGroceryData.frequencyDays}
                        onChange={(e) => setAddGroceryData({...addGroceryData, frequencyDays: e.target.value})}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                      />
                      <select
                        value={addGroceryData.card}
                        onChange={(e) => setAddGroceryData({...addGroceryData, card: e.target.value})}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                      >
                        {creditCards.map(card => (
                          <option key={card.id} value={card.id}>{card.name}</option>
                        ))}
                      </select>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setGroceryItems([...groceryItems, {...addGroceryData, id: 'groc-' + Date.now(), lastPurchased: '2026-03-27'}]);
                            setAddGroceryData({name: '', price: '', frequencyDays: '', category, card: 'bpi-gold'});
                            setShowAddGrocery(null);
                          }}
                          className="flex-1 bg-green-100 text-green-700 px-4 py-2 rounded font-semibold"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setShowAddGrocery(null)}
                          className="flex-1 bg-gray-100 text-gray-500 px-4 py-2 rounded font-semibold"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-100 border-b border-gray-300">
                        <tr>
                          <th className="text-left p-3 font-semibold">Item</th>
                          <th className="text-left p-3 font-semibold">Frequency</th>
                          <th className="text-left p-3 font-semibold">Price</th>
                          <th className="text-left p-3 font-semibold">Monthly Equiv</th>
                          <th className="text-left p-3 font-semibold">Last Purchased</th>
                          <th className="text-left p-3 font-semibold">Next Purchase</th>
                          <th className="text-left p-3 font-semibold">Status</th>
                          <th className="text-left p-3 font-semibold">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {items.map(item => {
                          const nextDate = getNextPurchaseDate(item.lastPurchased, item.frequencyDays);
                          const isOverdueBool = isOverdue(nextDate);
                          const monthlyEquiv = getMonthlyEquivalent(item.price, item.frequencyDays);
                          return (
                            <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
                              {editingGroceryId === item.id ? (
                                <>
                                  <td className="p-3"><input type="text" value={editGroceryData.name || ''} onChange={(e) => setEditGroceryData({...editGroceryData, name: e.target.value})} className="border border-gray-300 rounded px-2 py-1 w-full" /></td>
                                  <td className="p-3"><input type="text" inputMode="numeric" value={editGroceryData.frequencyDays || ''} onChange={(e) => setEditGroceryData({...editGroceryData, frequencyDays: e.target.value})} className="border border-gray-300 rounded px-2 py-1 w-full" /></td>
                                  <td className="p-3"><input type="text" inputMode="decimal" value={editGroceryData.price || ''} onChange={(e) => setEditGroceryData({...editGroceryData, price: e.target.value})} className="border border-gray-300 rounded px-2 py-1 w-full" /></td>
                                  <td className="p-3">{formatCurrency(getMonthlyEquivalent(editGroceryData.price || item.price, editGroceryData.frequencyDays || item.frequencyDays))}</td>
                                  <td className="p-3">{formatDate(item.lastPurchased)}</td>
                                  <td className="p-3">{formatDate(getNextPurchaseDate(item.lastPurchased, editGroceryData.frequencyDays || item.frequencyDays).toISOString().split('T')[0])}</td>
                                  <td className="p-3"><span className={`px-2 py-1 rounded text-xs font-semibold ${isOverdueBool ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>{isOverdueBool ? 'Needs Purchase' : 'Stocked'}</span></td>
                                  <td className="p-3 flex gap-1">
                                    <button onClick={() => { setGroceryItems(groceryItems.map(g => g.id === item.id ? {...g, ...editGroceryData} : g)); setEditingGroceryId(null); }} className="bg-green-100 text-green-700 px-2 py-1 rounded font-semibold text-xs">Save</button>
                                    <button onClick={() => setEditingGroceryId(null)} className="bg-gray-100 text-gray-500 px-2 py-1 rounded font-semibold text-xs">Cancel</button>
                                  </td>
                                </>
                              ) : (
                                <>
                                  <td className="p-3 font-semibold text-gray-800">{item.name}</td>
                                  <td className="p-3 text-gray-600">{getFrequencyLabel(item.frequencyDays)}</td>
                                  <td className="p-3 text-gray-600">{formatCurrency(item.price)}</td>
                                  <td className="p-3 text-gray-600">{formatCurrency(monthlyEquiv)}</td>
                                  <td className="p-3 text-gray-600">{formatDate(item.lastPurchased)}</td>
                                  <td className="p-3 text-gray-600">{formatDate(nextDate.toISOString().split('T')[0])}</td>
                                  <td className="p-3"><span className={`px-2 py-1 rounded text-xs font-semibold ${isOverdueBool ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>{isOverdueBool ? 'Needs Purchase' : 'Stocked'}</span></td>
                                  <td className="p-3 flex gap-1">
                                    <button onClick={() => { setGroceryItems(groceryItems.map(g => g.id === item.id ? {...g, lastPurchased: '2026-03-27'} : g)); }} className="bg-green-100 text-green-700 px-2 py-1 rounded font-semibold text-xs">✓</button>
                                    <button onClick={() => { setEditingGroceryId(item.id); setEditGroceryData(item); }} className="bg-blue-100 text-blue-600 px-2 py-1 rounded font-semibold text-xs">Edit</button>
                                    <button onClick={() => setGroceryItems(groceryItems.filter(g => g.id !== item.id))} className="bg-pink-100 text-pink-600 px-2 py-1 rounded font-semibold text-xs">Delete</button>
                                  </td>
                                </>
                              )}
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>


        {/* ===== PURCHASES TAB ===== */}
        {activeTab === 'purchases' && (
          <div className="space-y-6">
            {/* Add Purchase Form */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Add Purchase</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Description"
                  value={newPurchase.description}
                  onChange={e => setNewPurchase({...newPurchase, description: e.target.value})}
                  className="border rounded px-3 py-2"
                />
                <input
                  type="text"
                  inputMode="decimal"
                  placeholder="Amount (₱)"
                  value={newPurchase.amount}
                  onChange={e => setNewPurchase({...newPurchase, amount: e.target.value})}
                  className="border rounded px-3 py-2"
                />
                <select
                  value={newPurchase.category}
                  onChange={e => setNewPurchase({...newPurchase, category: e.target.value})}
                  className="border rounded px-3 py-2"
                >
                  <option>Food</option>
                  <option>Transport</option>
                  <option>Shopping</option>
                  <option>Bills</option>
                  <option>Travel</option>
                  <option>Entertainment</option>
                  <option>Health</option>
                  <option>Groceries</option>
                  <option>Other</option>
                </select>
                <select
                  value={newPurchase.card}
                  onChange={e => setNewPurchase({...newPurchase, card: e.target.value})}
                  className="border rounded px-3 py-2"
                >
                  <option value="">Select Card</option>
                  {creditCards.map(card => (
                    <option key={card.id} value={card.id}>{card.name}</option>
                  ))}
                  <option value="cash">Cash</option>
                </select>
                <input
                  type="date"
                  value={newPurchase.date}
                  onChange={e => setNewPurchase({...newPurchase, date: e.target.value})}
                  className="border rounded px-3 py-2"
                />
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={newPurchase.isNecessity}
                    onChange={e => setNewPurchase({...newPurchase, isNecessity: e.target.checked, necessityItemId: ''})}
                    className="w-4 h-4"
                  />
                  <label className="text-sm">Mark as Necessity Item</label>
                </div>
              </div>
              {newPurchase.isNecessity && (
                <div className="mt-4">
                  <label className="block text-sm font-medium mb-2">Select Grocery Item</label>
                  <select
                    value={newPurchase.necessityItemId}
                    onChange={e => setNewPurchase({...newPurchase, necessityItemId: e.target.value})}
                    className="border rounded px-3 py-2 w-full"
                  >
                    <option value="">Choose an item...</option>
                    {groceryItems.map(item => (
                      <option key={item.id} value={item.id}>{item.name} ({item.category})</option>
                    ))}
                  </select>
                </div>
              )}
              <button
                onClick={() => {
                  if (newPurchase.description && newPurchase.amount && newPurchase.card) {
                    const newId = 'purchase-' + Date.now();
                    setPurchases([...purchases, {...newPurchase, id: newId}]);

                    if (newPurchase.necessityItemId) {
                      setGroceryItems(groceryItems.map(item =>
                        item.id === newPurchase.necessityItemId
                          ? {...item, lastPurchased: new Date().toISOString().split('T')[0]}
                          : item
                      ));
                    }

                    setNewPurchase({description: '', amount: '', category: 'Food', card: '', date: '2026-03-27', isNecessity: false, necessityItemId: ''});
                  }
                }}
                className="mt-4 bg-green-100 text-green-700 px-4 py-2 rounded font-medium"
              >
                Save Purchase
              </button>
            </div>

            {/* Purchase Filter */}
            <div className="bg-white rounded-lg shadow p-4">
              <input
                type="text"
                placeholder="Filter by description or category..."
                value={purchaseFilter}
                onChange={e => setPurchaseFilter(e.target.value)}
                className="border rounded px-3 py-2 w-full"
              />
            </div>

            {/* Purchase History Table */}
            <div className="bg-white rounded-lg shadow overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left">Date</th>
                    <th className="px-4 py-2 text-left">Description</th>
                    <th className="px-4 py-2 text-right">Amount</th>
                    <th className="px-4 py-2 text-left">Category</th>
                    <th className="px-4 py-2 text-left">Card</th>
                  </tr>
                </thead>
                <tbody>
                  {purchases
                    .filter(p =>
                      purchaseFilter === '' ||
                      p.description.toLowerCase().includes(purchaseFilter.toLowerCase()) ||
                      p.category.toLowerCase().includes(purchaseFilter.toLowerCase())
                    )
                    .map(purchase => (
                      <tr key={purchase.id} className="border-t hover:bg-gray-50">
                        <td className="px-4 py-2">{purchase.date}</td>
                        <td className="px-4 py-2">{purchase.description}</td>
                        <td className="px-4 py-2 text-right">₱{Number(purchase.amount).toLocaleString()}</td>
                        <td className="px-4 py-2">{purchase.category}</td>
                        <td className="px-4 py-2">{purchase.card === 'cash' ? 'Cash' : creditCards.find(c => c.id === purchase.card)?.name || purchase.card}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Category Pie Chart */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Spending by Category</h3>
                {categoryData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie data={categoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}>
                        {categoryData.map((entry, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                      </Pie>
                      <Tooltip formatter={(v) => `₱${Number(v).toLocaleString()}`} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                ) : <p className="text-gray-500">No purchases yet</p>}
              </div>

              {/* Card Pie Chart */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Spending by Card</h3>
                {cardData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie data={cardData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}>
                        {cardData.map((entry, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                      </Pie>
                      <Tooltip formatter={(v) => `₱${Number(v).toLocaleString()}`} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                ) : <p className="text-gray-500">No purchases yet</p>}
              </div>
            </div>

            {/* Monthly Bar Chart */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Monthly Spending</h3>
              {monthlyData.length > 0 ? (
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={monthlyData}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(v) => `₱${Number(v).toLocaleString()}`} />
                    <Bar dataKey="amount" fill={COLORS[0]}>
                      {monthlyData.map((entry, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              ) : <p className="text-gray-500">No purchases yet</p>}
            </div>
          </div>
        )}

        {/* ===== TRAVEL TAB ===== */}
        {activeTab === 'travel' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
            {/* Trips Sidebar */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Trips</h3>

              <button
                onClick={() => {
                  setShowTripForm(true);
                  setEditingTripId(null);
                  setTripFormData({name: '', destination: '', startDate: '', endDate: '', notes: ''});
                }}
                className="w-full bg-green-100 text-green-700 px-4 py-2 rounded font-medium mb-4"
              >
                Add Trip
              </button>

              {showTripForm && (
                <div className="border rounded p-4 mb-4 bg-gray-50">
                  <input
                    type="text"
                    placeholder="Trip Name"
                    value={tripFormData.name}
                    onChange={e => setTripFormData({...tripFormData, name: e.target.value})}
                    className="border rounded px-3 py-2 w-full mb-2"
                  />
                  <input
                    type="text"
                    placeholder="Destination"
                    value={tripFormData.destination}
                    onChange={e => setTripFormData({...tripFormData, destination: e.target.value})}
                    className="border rounded px-3 py-2 w-full mb-2"
                  />
                  <input
                    type="date"
                    value={tripFormData.startDate}
                    onChange={e => setTripFormData({...tripFormData, startDate: e.target.value})}
                    className="border rounded px-3 py-2 w-full mb-2"
                  />
                  <input
                    type="date"
                    value={tripFormData.endDate}
                    onChange={e => setTripFormData({...tripFormData, endDate: e.target.value})}
                    className="border rounded px-3 py-2 w-full mb-2"
                  />
                  <textarea
                    placeholder="Notes"
                    value={tripFormData.notes}
                    onChange={e => setTripFormData({...tripFormData, notes: e.target.value})}
                    className="border rounded px-3 py-2 w-full mb-2"
                  />
                  <button
                    onClick={() => {
                      if (tripFormData.name && tripFormData.destination) {
                        const newId = 'trip-' + Date.now();
                        setTrips([...trips, {...tripFormData, id: newId, expenses: []}]);
                        setSelectedTripId(newId);
                        setShowTripForm(false);
                        setTripFormData({name: '', destination: '', startDate: '', endDate: '', notes: ''});
                      }
                    }}
                    className="w-full bg-green-100 text-green-700 px-4 py-2 rounded font-medium"
                  >
                    Save Trip
                  </button>
                  <button
                    onClick={() => setShowTripForm(false)}
                    className="w-full bg-gray-200 text-gray-600 px-4 py-2 rounded mt-2"
                  >
                    Cancel
                  </button>
                </div>
              )}

              <div className="space-y-2">
                {trips.map(trip => (
                  <div
                    key={trip.id}
                    onClick={() => setSelectedTripId(trip.id)}
                    className={`p-3 rounded cursor-pointer ${
                      selectedTripId === trip.id ? 'bg-blue-100 border-2 border-blue-500' : 'bg-gray-50 border'
                    }`}
                  >
                    <div className="font-medium">{trip.name}</div>
                    <div className="text-sm text-gray-600">{trip.destination}</div>
                    <div className="text-xs text-gray-500">{trip.startDate} to {trip.endDate}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trip Detail */}
            <div className="md:col-span-2 bg-white rounded-lg shadow p-6">
              {selectedTrip ? (
                  <div className="space-y-6">
                    {/* Trip Header */}
                    <div className="border-b pb-4">
                      {editingTripId === selectedTrip.id ? (
                        <div className="space-y-2">
                          <input
                            type="text"
                            value={editTripData.name}
                            onChange={e => setEditTripData({...editTripData, name: e.target.value})}
                            className="border rounded px-3 py-2 w-full font-bold text-lg"
                          />
                          <input
                            type="text"
                            value={editTripData.destination}
                            onChange={e => setEditTripData({...editTripData, destination: e.target.value})}
                            className="border rounded px-3 py-2 w-full"
                          />
                          <div className="grid grid-cols-2 gap-2">
                            <input
                              type="date"
                              value={editTripData.startDate}
                              onChange={e => setEditTripData({...editTripData, startDate: e.target.value})}
                              className="border rounded px-3 py-2"
                            />
                            <input
                              type="date"
                              value={editTripData.endDate}
                              onChange={e => setEditTripData({...editTripData, endDate: e.target.value})}
                              className="border rounded px-3 py-2"
                            />
                          </div>
                          <textarea
                            value={editTripData.notes}
                            onChange={e => setEditTripData({...editTripData, notes: e.target.value})}
                            className="border rounded px-3 py-2 w-full"
                          />
                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                setTrips(trips.map(t => t.id === selectedTrip.id ? {...t, ...editTripData} : t));
                                setEditingTripId(null);
                              }}
                              className="bg-green-100 text-green-700 px-4 py-2 rounded font-medium"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => setEditingTripId(null)}
                              className="bg-gray-200 text-gray-600 px-4 py-2 rounded"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className="flex justify-between items-start">
                            <div>
                              <h2 className="text-2xl font-bold">{selectedTrip.name}</h2>
                              <p className="text-gray-600">{selectedTrip.destination}</p>
                              <p className="text-sm text-gray-500">{selectedTrip.startDate} to {selectedTrip.endDate}</p>
                            </div>
                            <button
                              onClick={() => {
                                setEditingTripId(selectedTrip.id);
                                setEditTripData(selectedTrip);
                              }}
                              className="bg-blue-100 text-blue-600 px-3 py-2 rounded font-medium"
                            >
                              Edit
                            </button>
                          </div>
                          {selectedTrip.notes && <p className="text-sm mt-2 text-gray-700">{selectedTrip.notes}</p>}
                        </div>
                      )}
                    </div>

                    {/* Add Expense Button */}
                    <button
                      onClick={() => {
                        setShowExpenseForm(!showExpenseForm);
                        if (!showExpenseForm) {
                          setExpenseFormData({description: '', amount: '', category: 'Flight', card: '', paid: false, date: '', notes: ''});
                          setEditingExpenseId(null);
                        }
                      }}
                      className="bg-green-100 text-green-700 px-4 py-2 rounded font-medium"
                    >
                      {showExpenseForm ? 'Cancel' : 'Add Expense'}
                    </button>

                    {/* Expense Form */}
                    {showExpenseForm && (
                      <div className="border rounded p-4 bg-gray-50">
                        <input
                          type="text"
                          placeholder="Description"
                          value={expenseFormData.description}
                          onChange={e => setExpenseFormData({...expenseFormData, description: e.target.value})}
                          className="border rounded px-3 py-2 w-full mb-2"
                        />
                        <input
                          type="text"
                          inputMode="decimal"
                          placeholder="Amount (₱)"
                          value={expenseFormData.amount}
                          onChange={e => setExpenseFormData({...expenseFormData, amount: e.target.value})}
                          className="border rounded px-3 py-2 w-full mb-2"
                        />
                        <select
                          value={expenseFormData.category}
                          onChange={e => setExpenseFormData({...expenseFormData, category: e.target.value})}
                          className="border rounded px-3 py-2 w-full mb-2"
                        >
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
                        <select
                          value={expenseFormData.card}
                          onChange={e => setExpenseFormData({...expenseFormData, card: e.target.value})}
                          className="border rounded px-3 py-2 w-full mb-2"
                        >
                          <option value="">Select Card</option>
                          {creditCards.map(card => (
                            <option key={card.id} value={card.id}>{card.name}</option>
                          ))}
                          <option value="cash">Cash</option>
                        </select>
                        <input
                          type="date"
                          value={expenseFormData.date}
                          onChange={e => setExpenseFormData({...expenseFormData, date: e.target.value})}
                          className="border rounded px-3 py-2 w-full mb-2"
                        />
                        <textarea
                          placeholder="Notes"
                          value={expenseFormData.notes}
                          onChange={e => setExpenseFormData({...expenseFormData, notes: e.target.value})}
                          className="border rounded px-3 py-2 w-full mb-2"
                        />
                        <label className="flex items-center gap-2 mb-2">
                          <input
                            type="checkbox"
                            checked={expenseFormData.paid}
                            onChange={e => setExpenseFormData({...expenseFormData, paid: e.target.checked})}
                            className="w-4 h-4"
                          />
                          <span className="text-sm">Mark as Paid</span>
                        </label>
                        <button
                          onClick={() => {
                            if (expenseFormData.description && expenseFormData.amount) {
                              const newId = 'expense-' + Date.now();
                              const newExpense = {...expenseFormData, id: newId};
                              setTrips(trips.map(t =>
                                t.id === selectedTrip.id
                                  ? {...t, expenses: [...(t.expenses || []), newExpense]}
                                  : t
                              ));

                              if (expenseFormData.paid && expenseFormData.card !== 'cash') {
                                setCreditCards(creditCards.map(card =>
                                  card.id === expenseFormData.card
                                    ? {...card, balance: Number(card.balance) + Number(expenseFormData.amount)}
                                    : card
                                ));
                              }

                              setShowExpenseForm(false);
                              setExpenseFormData({description: '', amount: '', category: 'Flight', card: '', paid: false, date: '', notes: ''});
                            }
                          }}
                          className="w-full bg-green-100 text-green-700 px-4 py-2 rounded font-medium"
                        >
                          Save Expense
                        </button>
                      </div>
                    )}

                    {/* Expenses Table */}
                    {selectedTrip.expenses && selectedTrip.expenses.length > 0 && (
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead className="bg-gray-100">
                            <tr>
                              <th className="px-4 py-2 text-left">Description</th>
                              <th className="px-4 py-2 text-right">Amount</th>
                              <th className="px-4 py-2 text-left">Category</th>
                              <th className="px-4 py-2 text-left">Card</th>
                              <th className="px-4 py-2 text-center">Paid</th>
                              <th className="px-4 py-2 text-left">Date</th>
                              <th className="px-4 py-2 text-center">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {selectedTrip.expenses.map(expense => (
                              <tr key={expense.id} className="border-t hover:bg-gray-50">
                                <td className="px-4 py-2">{expense.description}</td>
                                <td className="px-4 py-2 text-right">₱{Number(expense.amount).toLocaleString()}</td>
                                <td className="px-4 py-2">{expense.category}</td>
                                <td className="px-4 py-2">{expense.card === 'cash' ? 'Cash' : creditCards.find(c => c.id === expense.card)?.name || expense.card}</td>
                                <td className="px-4 py-2 text-center">{expense.paid ? '✓' : '-'}</td>
                                <td className="px-4 py-2">{expense.date}</td>
                                <td className="px-4 py-2 text-center">
                                  <button
                                    onClick={() => setTrips(trips.map(t => t.id === selectedTrip.id ? {...t, expenses: t.expenses.filter(e => e.id !== expense.id)} : t))}
                                    className="bg-pink-100 text-pink-600 px-2 py-1 rounded text-xs font-medium"
                                  >
                                    Delete
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}

                    {/* Trip Summary */}
                    <div className="border-t pt-4">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="bg-blue-50 rounded p-4">
                          <p className="text-gray-600 text-sm">Total Cost</p>
                          <p className="text-2xl font-bold">₱{(selectedTrip.expenses || []).reduce((s, e) => s + Number(e.amount), 0).toLocaleString()}</p>
                        </div>
                        <div className="bg-green-50 rounded p-4">
                          <p className="text-gray-600 text-sm">Paid Total</p>
                          <p className="text-2xl font-bold">₱{(selectedTrip.expenses || []).filter(e => e.paid).reduce((s, e) => s + Number(e.amount), 0).toLocaleString()}</p>
                        </div>
                        <div className="bg-red-50 rounded p-4">
                          <p className="text-gray-600 text-sm">Unpaid Total</p>
                          <p className="text-2xl font-bold">₱{(selectedTrip.expenses || []).filter(e => !e.paid).reduce((s, e) => s + Number(e.amount), 0).toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">Select a trip to view details</p>
                )}
            </div>
          </div>
        )}

        {/* ===== CALENDAR TAB ===== */}
        {activeTab === 'calendar' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-6">
                <button
                  onClick={() => {
                    if (calendarMonth === 0) {
                      setCalendarMonth(11);
                      setCalendarYear(calendarYear - 1);
                    } else {
                      setCalendarMonth(calendarMonth - 1);
                    }
                  }}
                  className="px-4 py-2 border rounded"
                >
                  Prev
                </button>
                <h2 className="text-xl font-bold">
                  {new Date(calendarYear, calendarMonth).toLocaleDateString('en-US', {
                    month: 'long',
                    year: 'numeric',
                  })}
                </h2>
                <button
                  onClick={() => {
                    if (calendarMonth === 11) {
                      setCalendarMonth(0);
                      setCalendarYear(calendarYear + 1);
                    } else {
                      setCalendarMonth(calendarMonth + 1);
                    }
                  }}
                  className="px-4 py-2 border rounded"
                >
                  Next
                </button>
              </div>

              <div className="grid grid-cols-7 gap-1">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((dayName) => (
                  <div key={dayName} className="font-bold text-center p-2">
                    {dayName}
                  </div>
                ))}

                {calendarDays.map((day, index) => {
                  if (!day) {
                    return <div key={`empty-${index}`} className="p-4 bg-gray-50" />;
                  }

                  const dateStr = `${calendarYear}-${String(calendarMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                  const cycleForDay = payCycles.find((cycle) => cycle.date === dateStr);
                  const hasSubscription = subscriptions.some((sub) => {
                    if (!sub.nextDate) return false;
                    return new Date(sub.nextDate).toISOString().split('T')[0] === dateStr;
                  });
                  const hasBill = fixedBills.some((bill) => {
                    if (!bill.dueDate) return false;
                    return new Date(bill.dueDate).toISOString().split('T')[0] === dateStr;
                  });

                  return (
                    <button
                      key={dateStr}
                      onClick={() => {
                        setSelectedDate(dateStr);
                        setSelectedCycleId(cycleForDay ? cycleForDay.id : null);
                      }}
                      className={`p-4 rounded border-2 relative ${
                        selectedDate === dateStr ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                      }`}
                    >
                      <div className="font-medium">{day}</div>
                      <div className="flex gap-1 mt-1 justify-center">
                        {cycleForDay && <span className="w-2 h-2 bg-green-500 rounded-full" />}
                        {hasSubscription && <span className="w-2 h-2 bg-blue-500 rounded-full" />}
                        {hasBill && <span className="w-2 h-2 bg-red-500 rounded-full" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6 space-y-4">
              <button
                onClick={() => setShowAddCycle(!showAddCycle)}
                className="bg-green-100 text-green-700 px-4 py-2 rounded font-medium"
              >
                {showAddCycle ? 'Cancel' : 'Add Pay Cycle'}
              </button>

              {showAddCycle && (
                <div className="border rounded p-4 bg-gray-50 space-y-3">
                  <input
                    type="date"
                    value={addCycleData.date}
                    onChange={(e) => setAddCycleData({ ...addCycleData, date: e.target.value })}
                    className="border rounded px-3 py-2 w-full"
                  />
                  <select
                    value={addCycleData.source}
                    onChange={(e) => setAddCycleData({ ...addCycleData, source: e.target.value })}
                    className="border rounded px-3 py-2 w-full"
                  >
                    <option>Mole Street</option>
                    <option>Archy</option>
                    <option>Other</option>
                  </select>
                  <input
                    type="text"
                    inputMode="decimal"
                    placeholder="Amount (₱)"
                    value={addCycleData.amount}
                    onChange={(e) => setAddCycleData({ ...addCycleData, amount: e.target.value })}
                    className="border rounded px-3 py-2 w-full"
                  />
                  <button
                    onClick={() => {
                      if (!addCycleData.date || !addCycleData.amount) return;

                      const newId = `pay-${addCycleData.date}`;
                      const newCycle = {
                        id: newId,
                        date: addCycleData.date,
                        source: addCycleData.source,
                        amount: Number(addCycleData.amount),
                        payments: creditCards.map((card) => ({
                          cardId: card.id,
                          label: (card.label || card.name.substring(0, 3)).toUpperCase(),
                          amount: '',
                          paid: false,
                        })),
                        billPayments: (fixedBills || []).map((bill) => ({
                          name: bill.name,
                          amount: String(bill.amount || 0),
                          paid: false,
                        })),
                        cashExpenses: { withdrawals: '', fees: '' },
                        inboundCash: { deposits: '', refunds: '' },
                        notes: '',
                      };

                      setPayCycles([...payCycles, newCycle]);
                      setSelectedCycleId(newId);
                      setSelectedDate(addCycleData.date);
                      setShowAddCycle(false);
                      setAddCycleData({ date: '', source: 'Mole Street', amount: '' });
                    }}
                    className="w-full bg-green-100 text-green-700 px-4 py-2 rounded font-medium"
                  >
                    Create Cycle
                  </button>
                </div>
              )}
            </div>

            {selectedCycle && (
              <div className="bg-white rounded-lg shadow p-6 space-y-6">
                <div className="border-b pb-4">
                  <h2 className="text-xl font-bold">
                    {selectedCycle.date} Pay - {selectedCycle.source}
                  </h2>
                  <p className="text-3xl font-bold text-green-600">
                    ₱{Number(selectedCycle.amount || 0).toLocaleString()}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-3 text-lg">Card Payments</h3>
                  <div className="space-y-2">
                    {(selectedCycle.payments || []).map((payment, index) => (
                      <div key={payment.cardId || index} className="flex items-center gap-4 p-3 bg-gray-50 rounded">
                        <div className="font-medium min-w-16">{payment.label}</div>
                        <input
                          type="text"
                          inputMode="decimal"
                          placeholder="₱0"
                          value={payment.amount}
                          onChange={(e) => {
                            const newPayments = [...(selectedCycle.payments || [])];
                            newPayments[index] = { ...payment, amount: e.target.value };
                            setPayCycles(
                              payCycles.map((cycle) =>
                                cycle.id === selectedCycle.id ? { ...cycle, payments: newPayments } : cycle
                              )
                            );
                          }}
                          className="border rounded px-3 py-2 flex-1"
                        />
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={payment.paid}
                            onChange={() => {
                              const amount = Number(payment.amount) || 0;
                              if (!payment.paid && amount > 0) {
                                setCreditCards(
                                  creditCards.map((card) =>
                                    card.id === payment.cardId
                                      ? { ...card, balance: Math.max(0, Number(card.balance) - amount) }
                                      : card
                                  )
                                );
                              }

                              const newPayments = [...(selectedCycle.payments || [])];
                              newPayments[index] = { ...payment, paid: !payment.paid };
                              setPayCycles(
                                payCycles.map((cycle) =>
                                  cycle.id === selectedCycle.id ? { ...cycle, payments: newPayments } : cycle
                                )
                              );
                            }}
                            className="w-4 h-4"
                          />
                          <span className="text-sm">Paid</span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {selectedCycle.billPayments && selectedCycle.billPayments.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-3 text-lg">Bills</h3>
                    <div className="space-y-2">
                      {selectedCycle.billPayments.map((bill, index) => (
                        <div key={`${bill.name}-${index}`} className="flex items-center gap-4 p-3 bg-gray-50 rounded">
                          <div className="font-medium min-w-24">{bill.name}</div>
                          <input
                            type="text"
                            inputMode="decimal"
                            placeholder="₱0"
                            value={bill.amount}
                            onChange={(e) => {
                              const newBills = [...selectedCycle.billPayments];
                              newBills[index] = { ...bill, amount: e.target.value };
                              setPayCycles(
                                payCycles.map((cycle) =>
                                  cycle.id === selectedCycle.id
                                    ? { ...cycle, billPayments: newBills }
                                    : cycle
                                )
                              );
                            }}
                            className="border rounded px-3 py-2 flex-1"
                          />
                          <label className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={bill.paid}
                              onChange={() => {
                                const newBills = [...selectedCycle.billPayments];
                                newBills[index] = { ...bill, paid: !bill.paid };
                                setPayCycles(
                                  payCycles.map((cycle) =>
                                    cycle.id === selectedCycle.id
                                      ? { ...cycle, billPayments: newBills }
                                      : cycle
                                  )
                                );
                              }}
                              className="w-4 h-4"
                            />
                            <span className="text-sm">Paid</span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h3 className="font-semibold mb-3 text-lg">Cash Expenses</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-4 p-3 bg-gray-50 rounded">
                      <label className="font-medium min-w-24">Withdrawals</label>
                      <input
                        type="text"
                        inputMode="decimal"
                        placeholder="₱0"
                        value={selectedCycle.cashExpenses ? selectedCycle.cashExpenses.withdrawals : ''}
                        onChange={(e) =>
                          setPayCycles(
                            payCycles.map((cycle) =>
                              cycle.id === selectedCycle.id
                                ? {
                                    ...cycle,
                                    cashExpenses: {
                                      ...(cycle.cashExpenses || { withdrawals: '', fees: '' }),
                                      withdrawals: e.target.value,
                                    },
                                  }
                                : cycle
                            )
                          )
                        }
                        className="border rounded px-3 py-2 flex-1"
                      />
                    </div>
                    <div className="flex items-center gap-4 p-3 bg-gray-50 rounded">
                      <label className="font-medium min-w-24">Fees</label>
                      <input
                        type="text"
                        inputMode="decimal"
                        placeholder="₱0"
                        value={selectedCycle.cashExpenses ? selectedCycle.cashExpenses.fees : ''}
                        onChange={(e) =>
                          setPayCycles(
                            payCycles.map((cycle) =>
                              cycle.id === selectedCycle.id
                                ? {
                                    ...cycle,
                                    cashExpenses: {
                                      ...(cycle.cashExpenses || { withdrawals: '', fees: '' }),
                                      fees: e.target.value,
                                    },
                                  }
                                : cycle
                            )
                          )
                        }
                        className="border rounded px-3 py-2 flex-1"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3 text-lg">Inbound Cash</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-4 p-3 bg-gray-50 rounded">
                      <label className="font-medium min-w-24">Deposits</label>
                      <input
                        type="text"
                        inputMode="decimal"
                        placeholder="₱0"
                        value={selectedCycle.inboundCash ? selectedCycle.inboundCash.deposits : ''}
                        onChange={(e) =>
                          setPayCycles(
                            payCycles.map((cycle) =>
                              cycle.id === selectedCycle.id
                                ? {
                                    ...cycle,
                                    inboundCash: {
                                      ...(cycle.inboundCash || { deposits: '', refunds: '' }),
                                      deposits: e.target.value,
                                    },
                                  }
                                : cycle
                            )
                          )
                        }
                        className="border rounded px-3 py-2 flex-1"
                      />
                    </div>
                    <div className="flex items-center gap-4 p-3 bg-gray-50 rounded">
                      <label className="font-medium min-w-24">Refunds</label>
                      <input
                        type="text"
                        inputMode="decimal"
                        placeholder="₱0"
                        value={selectedCycle.inboundCash ? selectedCycle.inboundCash.refunds : ''}
                        onChange={(e) =>
                          setPayCycles(
                            payCycles.map((cycle) =>
                              cycle.id === selectedCycle.id
                                ? {
                                    ...cycle,
                                    inboundCash: {
                                      ...(cycle.inboundCash || { deposits: '', refunds: '' }),
                                      refunds: e.target.value,
                                    },
                                  }
                                : cycle
                            )
                          )
                        }
                        className="border rounded px-3 py-2 flex-1"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border-2 border-blue-200 rounded p-4">
                  <p className="text-gray-600 text-sm mb-1">Total Left After Allocation</p>
                  <p className={`text-3xl font-bold ${totalLeft >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
                    ₱{totalLeft.toLocaleString()}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-3 text-lg">Forecasted Card Balances</h3>
                  <div className="space-y-2">
                    {creditCards.map((card) => {
                      const payment = (selectedCycle.payments || []).find((item) => item.cardId === card.id);
                      const paymentAmount = Number(payment && payment.amount ? payment.amount : 0);
                      const forecasted = Number(card.balance) - paymentAmount;

                      return (
                        <div key={card.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                          <span className="font-medium">{card.name}</span>
                          <span className={`text-lg font-semibold ${forecasted >= 0 ? 'text-red-600' : 'text-green-600'}`}>
                            ₱{forecasted.toLocaleString()}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-4 bg-blue-50 border-2 border-blue-200 rounded p-4">
                    <p className="text-gray-600 text-sm mb-1">Total Forecasted Debt</p>
                    <p className="text-2xl font-bold text-blue-600">
                      ₱{totalForecastedDebt.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block font-medium mb-2">Notes</label>
                  <textarea
                    value={selectedCycle.notes || ''}
                    onChange={(e) =>
                      setPayCycles(
                        payCycles.map((cycle) =>
                          cycle.id === selectedCycle.id ? { ...cycle, notes: e.target.value } : cycle
                        )
                      )
                    }
                    className="border rounded px-3 py-2 w-full"
                    rows="3"
                  />
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default MyLedger;
