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
  Dot,
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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

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

  const [groceryItems, setGroceryItems] = useState(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('groceryItems') : null;
    return saved
      ? JSON.parse(saved)
      : [
          { id: 'vitd3k2', category: 'VITAMINS', name: 'Vitamin D3 & K2', price: 975, frequencyDays: 30, lastPurchased: null, card: 'bpi-gold' },
          { id: 'metthioni', category: 'VITAMINS', name: 'Met Thatione', price: 2017, frequencyDays: 30, lastPurchased: null, card: 'bpi-gold' },
          { id: 'cranberry', category: 'VITAMINS', name: 'Cranberry', price: 1297, frequencyDays: 60, lastPurchased: null, card: 'bpi-gold' },
          { id: 'vitamc', category: 'VITAMINS', name: 'Vitamin C', price: 280.9, frequencyDays: 30, lastPurchased: null, card: 'bpi-gold' },
          { id: 'vitame', category: 'VITAMINS', name: 'Vitamin E', price: 280.9, frequencyDays: 60, lastPurchased: null, card: 'bpi-gold' },
          { id: 'magpure', category: 'VITAMINS', name: 'Magnesium Pure', price: 1537, frequencyDays: 45, lastPurchased: null, card: 'bpi-gold' },
          { id: 'tonercele', category: 'SKINCARE', name: 'Toner Celeteque', price: 194, frequencyDays: 90, lastPurchased: null, card: 'bpi-gold' },
          { id: 'keanarice', category: 'SKINCARE', name: 'Keana Rice Pack', price: 468.17, frequencyDays: 60, lastPurchased: null, card: 'bpi-gold' },
          { id: 'keanaface', category: 'SKINCARE', name: 'Keana Rice Face Wash', price: 280.9, frequencyDays: 60, lastPurchased: null, card: 'bpi-gold' },
          { id: 'melanocc', category: 'SKINCARE', name: 'Melano CC', price: 329.59, frequencyDays: 365, lastPurchased: null, card: 'bpi-gold' },
          { id: 'hadalabo', category: 'SKINCARE', name: 'Hada Labo', price: 370.79, frequencyDays: 365, lastPurchased: null, card: 'bpi-gold' },
          { id: '345cream', category: 'SKINCARE', name: '345 Cream', price: 1050, frequencyDays: 90, lastPurchased: null, card: 'bpi-gold' },
          { id: 'shampoo', category: 'TOILETRIES', name: 'Shampoo', price: 130.34, frequencyDays: 90, lastPurchased: null, card: 'bpi-gold' },
          { id: 'deo', category: 'TOILETRIES', name: 'Deo', price: 178, frequencyDays: 90, lastPurchased: null, card: 'bpi-gold' },
          { id: 'toothpaste', category: 'TOILETRIES', name: 'Toothpaste', price: 215, frequencyDays: 120, lastPurchased: null, card: 'bpi-gold' },
          { id: 'conditioner', category: 'TOILETRIES', name: 'Conditioner', price: 130.34, frequencyDays: 90, lastPurchased: null, card: 'bpi-gold' },
          { id: 'lactacyd', category: 'TOILETRIES', name: 'Lactacyd', price: 542, frequencyDays: 180, lastPurchased: null, card: 'bpi-gold' },
          { id: 'safeguard', category: 'TOILETRIES', name: 'Safeguard', price: 488, frequencyDays: 180, lastPurchased: null, card: 'bpi-gold' },
          { id: 'milksoap', category: 'TOILETRIES', name: 'Milk Soap', price: 179.03, frequencyDays: 180, lastPurchased: null, card: 'bpi-gold' },
          { id: 'cottonbuds', category: 'TOILETRIES', name: 'Cotton Buds', price: 95, frequencyDays: 90, lastPurchased: null, card: 'bpi-gold' },
          { id: 'cottonpads', category: 'TOILETRIES', name: 'Cotton Pads', price: 99, frequencyDays: 90, lastPurchased: null, card: 'bpi-gold' },
          { id: 'toothbrush', category: 'TOILETRIES', name: 'Tooth Brush', price: 974, frequencyDays: 90, lastPurchased: null, card: 'bpi-gold' },
          { id: 'napkin', category: 'TOILETRIES', name: 'Napkin', price: 535, frequencyDays: 90, lastPurchased: null, card: 'bpi-gold' },
          { id: 'dashing', category: 'TOILETRIES', name: 'Dashing', price: 800, frequencyDays: 30, lastPurchased: null, card: 'bpi-gold' },
          { id: 'haircut', category: 'TOILETRIES', name: 'Haircut', price: 800, frequencyDays: 365, lastPurchased: null, card: 'bpi-gold' },
          { id: 'handwash', category: 'TOILETRIES', name: 'Hand Wash', price: 107.87, frequencyDays: 180, lastPurchased: null, card: 'bpi-gold' },
          { id: 'ariel-liquid', category: 'HOUSEHOLD', name: 'Ariel Liquid 4-pack', price: 1811, frequencyDays: 30, lastPurchased: null, card: 'bpi-gold' },
          { id: 'ariel-powder', category: 'HOUSEHOLD', name: 'Ariel Powder', price: 561, frequencyDays: 30, lastPurchased: null, card: 'bpi-gold' },
          { id: 'downy', category: 'HOUSEHOLD', name: 'Downy 2-pack', price: 838, frequencyDays: 30, lastPurchased: null, card: 'bpi-gold' },
          { id: 'zonrox', category: 'HOUSEHOLD', name: 'Zonrox', price: 283, frequencyDays: 30, lastPurchased: null, card: 'bpi-gold' },
          { id: 'albatross', category: 'HOUSEHOLD', name: 'Albatross', price: 192, frequencyDays: 30, lastPurchased: null, card: 'bpi-gold' },
        ];
  });

  const [purchases, setPurchases] = useState(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('purchases') : null;
    return saved ? JSON.parse(saved) : [];
  });

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

  const [subscriptions, setSubscriptions] = useState(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('subscriptions') : null;
    return saved
      ? JSON.parse(saved)
      : [
          { id: 'hbo-max', name: 'HBO Max', amount: 199, day: 27, card: 'security-wave', status: 'Active' },
          { id: 'canva', name: 'Canva', amount: 299, day: 27, card: 'security-wave', status: 'Active' },
          { id: 'appletv', name: 'Apple TV+', amount: 607.99, day: 1, card: 'security-wave', status: 'Active' },
          { id: 'netflix', name: 'Netflix', amount: 625.19, day: 5, card: 'bpi-gold', status: 'Active' },
          { id: 'spotify', name: 'Spotify', amount: 281.79, day: 8, card: 'bpi-gold', status: 'Active' },
          { id: 'google-one', name: 'Google One', amount: 604.99, day: 21, card: 'bpi-gold', status: 'Active' },
        ];
  });

  const [fixedBills, setFixedBills] = useState(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('fixedBills') : null;
    return saved
      ? JSON.parse(saved)
      : [
          { id: 'prulife', name: 'PruLife Insurance', amount: 3000, day: 15, status: 'Active' },
          { id: 'globe-plan', name: 'Globe Phone Plan', amount: 4893.84, day: 7, status: 'Active' },
        ];
  });

  const [installments, setInstallments] = useState(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('installments') : null;
    return saved
      ? JSON.parse(saved)
      : [
          { id: 'dryer', name: 'Dryer', totalAmount: 25000, monthlyPayment: 1041.67, months: 24, startDate: '2025-06-14', card: 'bpi-gold', remainingBalance: 15625, paid: false },
          { id: 'macmini', name: 'Mac Mini', totalAmount: 38469, monthlyPayment: 1602.88, months: 24, startDate: '2025-05-23', card: 'bpi-gold', remainingBalance: 22440.25, paid: false },
          { id: 'samsung', name: 'Samsung', totalAmount: 47513, monthlyPayment: 1979.71, months: 24, startDate: '2025-12-12', card: 'bpi-gold', remainingBalance: 41573.88, paid: false },
          { id: 'fiance-phone', name: "Fiancé's Phone", totalAmount: 24990, monthlyPayment: 1041.25, months: 24, startDate: '2025-03-14', card: 'bpi-gold', remainingBalance: 12495, paid: false, shareAmount: 0 },
          { id: 'christmas-gifts', name: 'Christmas Gifts', totalAmount: 2838.49, monthlyPayment: 946.16, months: 3, startDate: '2025-12-01', card: 'shopee', remainingBalance: 0, paid: true },
          { id: 'draltea345', name: 'Dr. Althea 345', totalAmount: 1028.32, monthlyPayment: 342.77, months: 3, startDate: '2026-03-01', card: 'shopee', remainingBalance: 0, paid: true },
          { id: 'roomlight', name: 'Room Light', totalAmount: 1740.22, monthlyPayment: 580.07, months: 3, startDate: '2026-03-01', card: 'shopee', remainingBalance: 0, paid: true },
          { id: 'detailmakeup', name: 'Detail Make Up', totalAmount: 1001.73, monthlyPayment: 333.91, months: 3, startDate: '2026-03-01', card: 'shopee', remainingBalance: 0, paid: true },
          { id: 'icemaker', name: 'Ice Maker', totalAmount: 3889, monthlyPayment: 1296.33, months: 3, startDate: '2026-03-01', card: 'shopee', remainingBalance: 0, paid: true },
        ];
  });

  const [monthlyIncome, setMonthlyIncome] = useState(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('monthlyIncome') : null;
    return saved ? JSON.parse(saved) : {};
  });

  const [calendarMonth, setCalendarMonth] = useState(new Date().getMonth());
  const [calendarYear, setCalendarYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState(null);

  const [editingSavingsId, setEditingSavingsId] = useState(null);
  const [editSavingsData, setEditSavingsData] = useState({});
  const [editingSubId, setEditingSubId] = useState(null);
  const [editSubData, setEditSubData] = useState({});
  const [editingBillId, setEditingBillId] = useState(null);
  const [editBillData, setEditBillData] = useState({});
  const [showAddSavingsForm, setShowAddSavingsForm] = useState(false);
  const [showAddSubForm, setShowAddSubForm] = useState(false);
  const [showAddBillForm, setShowAddBillForm] = useState(false);
  const [newSavings, setNewSavings] = useState({ name: '', balance: '' });
  const [newSubscription, setNewSubscription] = useState({ name: '', amount: '', day: '', card: '', status: 'Active' });
  const [newBill, setNewBill] = useState({ name: '', amount: '', day: '', status: 'Active' });

  const [editingCardId, setEditingCardId] = useState(null);
  const [editCardData, setEditCardData] = useState({});
  const [loggingPaymentCardId, setLoggingPaymentCardId] = useState(null);
  const [paymentData, setPaymentData] = useState({ amount: '', date: '' });

  const [activeGroceryCategory, setActiveGroceryCategory] = useState('VITAMINS');
  const [showAddGroceryForm, setShowAddGroceryForm] = useState(false);
  const [newGroceryItem, setNewGroceryItem] = useState({ name: '', price: '', frequencyDays: '', category: 'VITAMINS', card: 'bpi-gold' });
  const [editingGroceryId, setEditingGroceryId] = useState(null);
  const [editGroceryData, setEditGroceryData] = useState({});

  const [newPurchase, setNewPurchase] = useState({ description: '', amount: '', category: 'Food', card: '', date: '2026-03-27', isNecessity: false, necessityItemId: '' });
  const [purchaseFilter, setPurchaseFilter] = useState('all');

  const [showTripForm, setShowTripForm] = useState(false);
  const [newTrip, setNewTrip] = useState({ name: '', destination: '', startDate: '', endDate: '', notes: '' });
  const [selectedTripId, setSelectedTripId] = useState('shanghai-2026');
  const [showExpenseForm, setShowExpenseForm] = useState(null);
  const [newExpense, setNewExpense] = useState({ description: '', amount: '', category: 'Flight', card: '', paid: false, date: '', notes: '' });
  const [editingTripId, setEditingTripId] = useState(null);
  const [editingExpenseId, setEditingExpenseId] = useState(null);

  const [editingInstallmentId, setEditingInstallmentId] = useState(null);
  const [editInstallmentData, setEditInstallmentData] = useState({});

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

  const getCardName = (cardId) => {
    const card = creditCards.find((c) => c.id === cardId);
    return card ? card.name : cardId;
  };

  const calculateMonthsToPayoff = (balance, rate, payment) => {
    if (payment === 0 || balance === 0) return 0;
    const monthlyRate = rate / 100 / 12;
    if (monthlyRate === 0) {
      return Math.ceil(balance / payment);
    }
    const months = -Math.log(1 - (balance * monthlyRate) / payment) / Math.log(1 + monthlyRate);
    return Math.max(0, Math.ceil(months));
  };

  const getPayoffDate = (balance, rate, payment) => {
    const months = calculateMonthsToPayoff(balance, rate, payment);
    const date = new Date();
    date.setMonth(date.getMonth() + months);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
  };

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const getEventsForDate = (day) => {
    const events = [];

    subscriptions.forEach((sub) => {
      if (sub.day === day) {
        events.push({
          type: 'subscription',
          label: sub.name,
          color: 'bg-blue-400',
        });
      }
    });

    fixedBills.forEach((bill) => {
      if (bill.day === day) {
        events.push({
          type: 'bill',
          label: bill.name,
          color: 'bg-red-400',
        });
      }
    });

    creditCards.forEach((card) => {
      if (card.statementDay === day) {
        events.push({
          type: 'statement',
          label: `${card.name.split(' ')[0]} Stmt`,
          color: 'bg-orange-400',
        });
      }
    });

    trips.forEach((trip) => {
      const startDate = new Date(trip.startDate);
      const endDate = new Date(trip.endDate);
      const checkDate = new Date(calendarYear, calendarMonth, day);
      if (checkDate >= startDate && checkDate <= endDate) {
        events.push({
          type: 'travel',
          label: trip.name,
          color: 'bg-teal-400',
        });
      }
    });

    return events;
  };

  const handleEditSavings = (savings) => {
    setEditingSavingsId(savings.id);
    setEditSavingsData({ ...savings });
  };

  const handleSaveSavingsEdit = () => {
    setSavingsAccounts(
      savingsAccounts.map((s) => (s.id === editingSavingsId ? { ...s, ...editSavingsData } : s))
    );
    setEditingSavingsId(null);
    setEditSavingsData({});
  };

  const handleDeleteSavings = (id) => {
    setSavingsAccounts(savingsAccounts.filter((s) => s.id !== id));
  };

  const handleAddSavings = () => {
    if (newSavings.name && newSavings.balance) {
      setSavingsAccounts([
        ...savingsAccounts,
        {
          id: `savings-${Date.now()}`,
          name: newSavings.name,
          balance: Number(newSavings.balance),
        },
      ]);
      setNewSavings({ name: '', balance: '' });
      setShowAddSavingsForm(false);
    }
  };

  const handleEditSubscription = (sub) => {
    setEditingSubId(sub.id);
    setEditSubData({ ...sub });
  };

  const handleSaveSubscriptionEdit = () => {
    setSubscriptions(
      subscriptions.map((s) => (s.id === editingSubId ? { ...s, ...editSubData } : s))
    );
    setEditingSubId(null);
    setEditSubData({});
  };

  const handleDeleteSubscription = (id) => {
    setSubscriptions(subscriptions.filter((s) => s.id !== id));
  };

  const handleAddSubscription = () => {
    if (newSubscription.name && newSubscription.amount && newSubscription.day && newSubscription.card) {
      setSubscriptions([
        ...subscriptions,
        {
          id: `sub-${Date.now()}`,
          name: newSubscription.name,
          amount: Number(newSubscription.amount),
          day: Number(newSubscription.day),
          card: newSubscription.card,
          status: 'Active',
        },
      ]);
      setNewSubscription({ name: '', amount: '', day: '', card: '', status: 'Active' });
      setShowAddSubForm(false);
    }
  };

  const handleEditBill = (bill) => {
    setEditingBillId(bill.id);
    setEditBillData({ ...bill });
  };

  const handleSaveBillEdit = () => {
    setFixedBills(
      fixedBills.map((b) => (b.id === editingBillId ? { ...b, ...editBillData } : b))
    );
    setEditingBillId(null);
    setEditBillData({});
  };

  const handleDeleteBill = (id) => {
    setFixedBills(fixedBills.filter((b) => b.id !== id));
  };

  const handleAddBill = () => {
    if (newBill.name && newBill.amount && newBill.day) {
      setFixedBills([
        ...fixedBills,
        {
          id: `bill-${Date.now()}`,
          name: newBill.name,
          amount: Number(newBill.amount),
          day: Number(newBill.day),
          status: 'Active',
        },
      ]);
      setNewBill({ name: '', amount: '', day: '', status: 'Active' });
      setShowAddBillForm(false);
    }
  };

  const handleEditCard = (card) => {
    setEditingCardId(card.id);
    setEditCardData({ ...card });
  };

  const handleSaveCardEdit = () => {
    setCreditCards(
      creditCards.map((c) => (c.id === editingCardId ? { ...c, ...editCardData } : c))
    );
    setEditingCardId(null);
    setEditCardData({});
  };

  const handleLogPayment = () => {
    if (paymentData.amount && loggingPaymentCardId) {
      const amount = Number(paymentData.amount);
      setCreditCards(
        creditCards.map((c) => {
          if (c.id === loggingPaymentCardId) {
            return {
              ...c,
              balance: Math.max(0, c.balance - amount),
              paymentHistory: [...(c.paymentHistory || []), { date: paymentData.date, amount }],
            };
          }
          return c;
        })
      );
      setLoggingPaymentCardId(null);
      setPaymentData({ amount: '', date: '' });
    }
  };

  const handleEditGroceryItem = (item) => {
    setEditingGroceryId(item.id);
    setEditGroceryData({ ...item });
  };

  const handleSaveGroceryEdit = () => {
    setGroceryItems(
      groceryItems.map((g) => (g.id === editingGroceryId ? { ...g, ...editGroceryData } : g))
    );
    setEditingGroceryId(null);
    setEditGroceryData({});
  };

  const handleDeleteGroceryItem = (id) => {
    setGroceryItems(groceryItems.filter((g) => g.id !== id));
  };

  const handleAddGroceryItem = () => {
    if (newGroceryItem.name && newGroceryItem.price && newGroceryItem.frequencyDays) {
      setGroceryItems([
        ...groceryItems,
        {
          id: `grocery-${Date.now()}`,
          category: newGroceryItem.category,
          name: newGroceryItem.name,
          price: Number(newGroceryItem.price),
          frequencyDays: Number(newGroceryItem.frequencyDays),
          lastPurchased: null,
          card: newGroceryItem.card,
        },
      ]);
      setNewGroceryItem({ name: '', price: '', frequencyDays: '', category: 'VITAMINS', card: 'bpi-gold' });
      setShowAddGroceryForm(false);
    }
  };

  const handleAddPurchase = () => {
    if (newPurchase.description && newPurchase.amount && newPurchase.card) {
      setPurchases([
        ...purchases,
        {
          id: `purchase-${Date.now()}`,
          description: newPurchase.description,
          amount: Number(newPurchase.amount),
          category: newPurchase.category,
          card: newPurchase.card,
          date: newPurchase.date,
          isNecessity: newPurchase.isNecessity,
          necessityItemId: newPurchase.necessityItemId,
        },
      ]);
      setNewPurchase({ description: '', amount: '', category: 'Food', card: '', date: '2026-03-27', isNecessity: false, necessityItemId: '' });
    }
  };

  const handleDeletePurchase = (id) => {
    setPurchases(purchases.filter((p) => p.id !== id));
  };

  const handleAddTrip = () => {
    if (newTrip.name && newTrip.destination && newTrip.startDate && newTrip.endDate) {
      setTrips([
        ...trips,
        {
          id: `trip-${Date.now()}`,
          name: newTrip.name,
          destination: newTrip.destination,
          startDate: newTrip.startDate,
          endDate: newTrip.endDate,
          notes: newTrip.notes,
          expenses: [],
        },
      ]);
      setNewTrip({ name: '', destination: '', startDate: '', endDate: '', notes: '' });
      setShowTripForm(false);
    }
  };

  const handleDeleteTrip = (id) => {
    setTrips(trips.filter((t) => t.id !== id));
  };

  const handleAddExpense = () => {
    if (newExpense.description && newExpense.amount && selectedTripId) {
      setTrips(
        trips.map((t) => {
          if (t.id === selectedTripId) {
            return {
              ...t,
              expenses: [
                ...t.expenses,
                {
                  id: `expense-${Date.now()}`,
                  description: newExpense.description,
                  amount: Number(newExpense.amount),
                  category: newExpense.category,
                  card: newExpense.card,
                  paid: newExpense.paid,
                  date: newExpense.date,
                  notes: newExpense.notes,
                },
              ],
            };
          }
          return t;
        })
      );
      setNewExpense({ description: '', amount: '', category: 'Flight', card: '', paid: false, date: '', notes: '' });
      setShowExpenseForm(null);
    }
  };

  const handleDeleteExpense = (tripId, expenseId) => {
    setTrips(
      trips.map((t) => {
        if (t.id === tripId) {
          return {
            ...t,
            expenses: t.expenses.filter((e) => e.id !== expenseId),
          };
        }
        return t;
      })
    );
  };

  const handleEditInstallment = (installment) => {
    setEditingInstallmentId(installment.id);
    setEditInstallmentData({ ...installment });
  };

  const handleSaveInstallmentEdit = () => {
    setInstallments(
      installments.map((i) => (i.id === editingInstallmentId ? { ...i, ...editInstallmentData } : i))
    );
    setEditingInstallmentId(null);
    setEditInstallmentData({});
  };

  const handlePayInstallmentThisMonth = (id) => {
    setInstallments(
      installments.map((i) => {
        if (i.id === id) {
          const newBalance = Math.max(0, i.remainingBalance - i.monthlyPayment);
          return { ...i, remainingBalance: newBalance, paid: newBalance === 0 };
        }
        return i;
      })
    );
  };

  const handleDeleteInstallment = (id) => {
    setInstallments(installments.filter((i) => i.id !== id));
  };

  const monthlySubscriptionTotal = subscriptions.reduce(
    (sum, sub) => sum + Number(sub.status === 'Active' ? sub.amount : 0),
    0
  );

  const monthlyBillsTotal = fixedBills.reduce((sum, bill) => sum + Number(bill.amount), 0);

  const monthlyInstallments = installments.reduce((sum, inst) => sum + Number(inst.monthlyPayment), 0);

  const totalMonthlyObligations = Number(monthlySubscriptionTotal) + Number(monthlyBillsTotal) + Number(monthlyInstallments);

  const totalCreditCardDebt = creditCards.reduce((sum, card) => sum + Number(card.balance), 0);

  const totalSavings = savingsAccounts.reduce((sum, acc) => sum + Number(acc.balance), 0);

  const totalAvailableCredit = creditCards.reduce((sum, card) => sum + (Number(card.limit) - Number(card.balance)), 0);

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-800">Dashboard</h2>
        <div className="flex items-center space-x-2 text-gray-600">
          <Clock size={16} />
          <span className="text-sm">{currentDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-pink-100 to-pink-200 rounded-lg p-6 shadow-sm">
          <div className="text-sm text-gray-700 mb-2">Total Savings</div>
          <div className="text-2xl font-bold text-pink-900">₱{totalSavings.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
        </div>

        <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg p-6 shadow-sm">
          <div className="text-sm text-gray-700 mb-2">Credit Card Debt</div>
          <div className="text-2xl font-bold text-purple-900">₱{totalCreditCardDebt.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
        </div>

        <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg p-6 shadow-sm">
          <div className="text-sm text-gray-700 mb-2">Available Credit</div>
          <div className="text-2xl font-bold text-blue-900">₱{totalAvailableCredit.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
        </div>

        <div className="bg-gradient-to-br from-rose-100 to-rose-200 rounded-lg p-6 shadow-sm">
          <div className="text-sm text-gray-700 mb-2">Monthly Obligations</div>
          <div className="text-2xl font-bold text-rose-900">₱{totalMonthlyObligations.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800">Savings Accounts</h3>
          {!showAddSavingsForm && (
            <button
              onClick={() => setShowAddSavingsForm(true)}
              className="bg-gradient-to-r from-pink-400 to-pink-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:shadow-lg transition"
            >
              <Plus size={16} />
              <span>Add</span>
            </button>
          )}
        </div>

        {showAddSavingsForm && (
          <div className="mb-6 p-4 bg-pink-50 rounded-lg border border-pink-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Account Name"
                value={newSavings.name}
                onChange={(e) => setNewSavings({ ...newSavings, name: e.target.value })}
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-pink-400"
              />
              <input
                type="text"
                inputMode="decimal"
                placeholder="Balance"
                value={newSavings.balance}
                onChange={(e) => setNewSavings({ ...newSavings, balance: e.target.value })}
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-pink-400"
              />
            </div>
            <div className="flex space-x-2 mt-4">
              <button
                onClick={handleAddSavings}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
              >
                Add
              </button>
              <button
                onClick={() => {
                  setShowAddSavingsForm(false);
                  setNewSavings({ name: '', balance: '' });
                }}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className="space-y-3">
          {savingsAccounts.map((savings) => (
            <div key={savings.id} className="flex justify-between items-center p-4 bg-gradient-to-r from-pink-50 to-blue-50 rounded-lg border border-pink-100">
              {editingSavingsId === savings.id ? (
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={editSavingsData.name || ''}
                    onChange={(e) => setEditSavingsData({ ...editSavingsData, name: e.target.value })}
                    className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-pink-400"
                  />
                  <input
                    type="text"
                    inputMode="decimal"
                    value={editSavingsData.balance || ''}
                    onChange={(e) => setEditSavingsData({ ...editSavingsData, balance: Number(e.target.value) })}
                    className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-pink-400"
                  />
                </div>
              ) : (
                <>
                  <div>
                    <div className="font-semibold text-gray-800">{savings.name}</div>
                    <div className="text-sm text-gray-600">₱{Number(savings.balance).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                  </div>
                </>
              )}

              <div className="flex space-x-2">
                {editingSavingsId === savings.id ? (
                  <>
                    <button onClick={handleSaveSavingsEdit} className="bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600 transition flex items-center space-x-1">
                      <Check size={16} />
                    </button>
                    <button
                      onClick={() => {
                        setEditingSavingsId(null);
                        setEditSavingsData({});
                      }}
                      className="bg-gray-400 text-white px-3 py-2 rounded hover:bg-gray-500 transition flex items-center space-x-1"
                    >
                      <X size={16} />
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEditSavings(savings)} className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 transition flex items-center space-x-1">
                      <Edit2 size={16} />
                    </button>
                    <button onClick={() => handleDeleteSavings(savings.id)} className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 transition flex items-center space-x-1">
                      <Trash2 size={16} />
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800">Subscriptions</h3>
          {!showAddSubForm && (
            <button
              onClick={() => setShowAddSubForm(true)}
              className="bg-gradient-to-r from-blue-400 to-blue-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:shadow-lg transition"
            >
              <Plus size={16} />
              <span>Add</span>
            </button>
          )}
        </div>

        {showAddSubForm && (
          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Subscription Name"
                value={newSubscription.name}
                onChange={(e) => setNewSubscription({ ...newSubscription, name: e.target.value })}
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-400"
              />
              <input
                type="text"
                inputMode="decimal"
                placeholder="Amount"
                value={newSubscription.amount}
                onChange={(e) => setNewSubscription({ ...newSubscription, amount: e.target.value })}
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-400"
              />
              <input
                type="text"
                inputMode="numeric"
                placeholder="Day of Month"
                value={newSubscription.day}
                onChange={(e) => setNewSubscription({ ...newSubscription, day: e.target.value })}
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-400"
              />
              <select
                value={newSubscription.card}
                onChange={(e) => setNewSubscription({ ...newSubscription, card: e.target.value })}
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-400 bg-white"
              >
                <option value="">Select Card</option>
                {creditCards.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex space-x-2 mt-4">
              <button
                onClick={handleAddSubscription}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
              >
                Add
              </button>
              <button
                onClick={() => {
                  setShowAddSubForm(false);
                  setNewSubscription({ name: '', amount: '', day: '', card: '', status: 'Active' });
                }}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className="space-y-3">
          {subscriptions.map((sub) => (
            <div key={sub.id} className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100">
              {editingSubId === sub.id ? (
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={editSubData.name || ''}
                    onChange={(e) => setEditSubData({ ...editSubData, name: e.target.value })}
                    className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-400"
                  />
                  <input
                    type="text"
                    inputMode="decimal"
                    value={editSubData.amount || ''}
                    onChange={(e) => setEditSubData({ ...editSubData, amount: Number(e.target.value) })}
                    className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-400"
                  />
                  <input
                    type="text"
                    inputMode="numeric"
                    value={editSubData.day || ''}
                    onChange={(e) => setEditSubData({ ...editSubData, day: Number(e.target.value) })}
                    className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-400"
                  />
                  <select
                    value={editSubData.card || ''}
                    onChange={(e) => setEditSubData({ ...editSubData, card: e.target.value })}
                    className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-400 bg-white"
                  >
                    <option value="">Select Card</option>
                    {creditCards.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <>
                  <div>
                    <div className="font-semibold text-gray-800">{sub.name}</div>
                    <div className="text-sm text-gray-600">₱{Number(sub.amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} on day {sub.day} • {getCardName(sub.card)}</div>
                  </div>
                  <div className="text-sm font-semibold text-blue-700 bg-blue-100 px-3 py-1 rounded-full">{sub.status}</div>
                </>
              )}

              <div className="flex space-x-2">
                {editingSubId === sub.id ? (
                  <>
                    <button onClick={handleSaveSubscriptionEdit} className="bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600 transition flex items-center space-x-1">
                      <Check size={16} />
                    </button>
                    <button
                      onClick={() => {
                        setEditingSubId(null);
                        setEditSubData({});
                      }}
                      className="bg-gray-400 text-white px-3 py-2 rounded hover:bg-gray-500 transition flex items-center space-x-1"
                    >
                      <X size={16} />
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEditSubscription(sub)} className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 transition flex items-center space-x-1">
                      <Edit2 size={16} />
                    </button>
                    <button onClick={() => handleDeleteSubscription(sub.id)} className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 transition flex items-center space-x-1">
                      <Trash2 size={16} />
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800">Fixed Bills</h3>
          {!showAddBillForm && (
            <button
              onClick={() => setShowAddBillForm(true)}
              className="bg-gradient-to-r from-red-400 to-red-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:shadow-lg transition"
            >
              <Plus size={16} />
              <span>Add</span>
            </button>
          )}
        </div>

        {showAddBillForm && (
          <div className="mb-6 p-4 bg-red-50 rounded-lg border border-red-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Bill Name"
                value={newBill.name}
                onChange={(e) => setNewBill({ ...newBill, name: e.target.value })}
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-red-400"
              />
              <input
                type="text"
                inputMode="decimal"
                placeholder="Amount"
                value={newBill.amount}
                onChange={(e) => setNewBill({ ...newBill, amount: e.target.value })}
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-red-400"
              />
              <input
                type="text"
                inputMode="numeric"
                placeholder="Day of Month"
                value={newBill.day}
                onChange={(e) => setNewBill({ ...newBill, day: e.target.value })}
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-red-400"
              />
            </div>
            <div className="flex space-x-2 mt-4">
              <button
                onClick={handleAddBill}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
              >
                Add
              </button>
              <button
                onClick={() => {
                  setShowAddBillForm(false);
                  setNewBill({ name: '', amount: '', day: '', status: 'Active' });
                }}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className="space-y-3">
          {fixedBills.map((bill) => (
            <div key={bill.id} className="flex justify-between items-center p-4 bg-gradient-to-r from-red-50 to-pink-50 rounded-lg border border-red-100">
              {editingBillId === bill.id ? (
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={editBillData.name || ''}
                    onChange={(e) => setEditBillData({ ...editBillData, name: e.target.value })}
                    className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-red-400"
                  />
                  <input
                    type="text"
                    inputMode="decimal"
                    value={editBillData.amount || ''}
                    onChange={(e) => setEditBillData({ ...editBillData, amount: Number(e.target.value) })}
                    className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-red-400"
                  />
                  <input
                    type="text"
                    inputMode="numeric"
                    value={editBillData.day || ''}
                    onChange={(e) => setEditBillData({ ...editBillData, day: Number(e.target.value) })}
                    className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-red-400"
                  />
                </div>
              ) : (
                <>
                  <div>
                    <div className="font-semibold text-gray-800">{bill.name}</div>
                    <div className="text-sm text-gray-600">₱{Number(bill.amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} on day {bill.day}</div>
                  </div>
                  <div className="text-sm font-semibold text-red-700 bg-red-100 px-3 py-1 rounded-full">{bill.status}</div>
                </>
              )}

              <div className="flex space-x-2">
                {editingBillId === bill.id ? (
                  <>
                    <button onClick={handleSaveBillEdit} className="bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600 transition flex items-center space-x-1">
                      <Check size={16} />
                    </button>
                    <button
                      onClick={() => {
                        setEditingBillId(null);
                        setEditBillData({});
                      }}
                      className="bg-gray-400 text-white px-3 py-2 rounded hover:bg-gray-500 transition flex items-center space-x-1"
                    >
                      <X size={16} />
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEditBill(bill)} className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 transition flex items-center space-x-1">
                      <Edit2 size={16} />
                    </button>
                    <button onClick={() => handleDeleteBill(bill.id)} className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 transition flex items-center space-x-1">
                      <Trash2 size={16} />
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderCreditCards = () => (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">Credit Cards</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {creditCards.map((card) => {
          const monthsToPayoff = calculateMonthsToPayoff(card.balance, card.rate, card.minPayment);
          const payoffDate = getPayoffDate(card.balance, card.rate, card.minPayment);

          return (
            <div key={card.id} className="bg-gradient-to-br from-pink-100 to-purple-100 rounded-lg shadow-md p-6 border border-pink-200">
              {editingCardId === card.id ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={editCardData.balance || ''}
                    inputMode="decimal"
                    placeholder="Balance"
                    onChange={(e) => setEditCardData({ ...editCardData, balance: Number(e.target.value) })}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-pink-400"
                  />
                  <input
                    type="text"
                    value={editCardData.minPayment || ''}
                    inputMode="decimal"
                    placeholder="Min Payment"
                    onChange={(e) => setEditCardData({ ...editCardData, minPayment: Number(e.target.value) })}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-pink-400"
                  />
                  <div className="flex space-x-2">
                    <button onClick={handleSaveCardEdit} className="flex-1 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setEditingCardId(null);
                        setEditCardData({});
                      }}
                      className="flex-1 bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">{card.name}</h3>
                      <div className="text-2xl font-bold text-pink-900 mt-2">₱{Number(card.balance).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                    </div>
                    <div className="text-sm text-gray-600">Limit: ₱{Number(card.limit).toLocaleString('en-US', { minimumFractionDigits: 0 })}</div>
                  </div>

                  <div className="space-y-2 mb-4 text-sm text-gray-700">
                    <div className="flex justify-between">
                      <span>Rate:</span>
                      <span className="font-semibold">{card.rate}% APR</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Min Payment:</span>
                      <span className="font-semibold">₱{Number(card.minPayment).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Statement Day:</span>
                      <span className="font-semibold">{card.statementDay}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Days to Due:</span>
                      <span className="font-semibold">{card.daysTodue}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-pink-200">
                      <span>Months to Payoff:</span>
                      <span className="font-semibold text-pink-900">{monthsToPayoff} months</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Est. Payoff:</span>
                      <span className="font-semibold text-pink-900">{payoffDate}</span>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button onClick={() => handleEditCard(card)} className="flex-1 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition flex items-center justify-center space-x-2">
                      <Edit2 size={16} />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => {
                        setLoggingPaymentCardId(card.id);
                        setPaymentData({ amount: '', date: new Date().toISOString().split('T')[0] });
                      }}
                      className="flex-1 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition flex items-center justify-center space-x-2"
                    >
                      <DollarSign size={16} />
                      <span>Payment</span>
                    </button>
                  </div>
                </>
              )}

              {loggingPaymentCardId === card.id && (
                <div className="mt-4 p-4 bg-white rounded-lg border border-pink-200">
                  <h4 className="font-semibold text-gray-800 mb-3">Log Payment</h4>
                  <div className="space-y-3">
                    <input
                      type="text"
                      inputMode="decimal"
                      placeholder="Payment Amount"
                      value={paymentData.amount}
                      onChange={(e) => setPaymentData({ ...paymentData, amount: e.target.value })}
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-pink-400"
                    />
                    <input
                      type="date"
                      value={paymentData.date}
                      onChange={(e) => setPaymentData({ ...paymentData, date: e.target.value })}
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-pink-400"
                    />
                    <div className="flex space-x-2">
                      <button onClick={handleLogPayment} className="flex-1 bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600 transition">
                        Log
                      </button>
                      <button
                        onClick={() => {
                          setLoggingPaymentCardId(null);
                          setPaymentData({ amount: '', date: '' });
                        }}
                        className="flex-1 bg-gray-400 text-white px-3 py-2 rounded hover:bg-gray-500 transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderGrocery = () => {
    const categories = ['VITAMINS', 'SKINCARE', 'TOILETRIES', 'HOUSEHOLD'];
    const filteredItems = groceryItems.filter((item) => item.category === activeGroceryCategory);

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold text-gray-800">Grocery Tracker</h2>
          {!showAddGroceryForm && (
            <button
              onClick={() => setShowAddGroceryForm(true)}
              className="bg-gradient-to-r from-green-400 to-green-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:shadow-lg transition"
            >
              <Plus size={16} />
              <span>Add Item</span>
            </button>
          )}
        </div>

        {showAddGroceryForm && (
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Item Name"
                value={newGroceryItem.name}
                onChange={(e) => setNewGroceryItem({ ...newGroceryItem, name: e.target.value })}
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-green-400"
              />
              <input
                type="text"
                inputMode="decimal"
                placeholder="Price"
                value={newGroceryItem.price}
                onChange={(e) => setNewGroceryItem({ ...newGroceryItem, price: e.target.value })}
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-green-400"
              />
              <input
                type="text"
                inputMode="numeric"
                placeholder="Frequency (days)"
                value={newGroceryItem.frequencyDays}
                onChange={(e) => setNewGroceryItem({ ...newGroceryItem, frequencyDays: e.target.value })}
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-green-400"
              />
              <select
                value={newGroceryItem.category}
                onChange={(e) => setNewGroceryItem({ ...newGroceryItem, category: e.target.value })}
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-green-400 bg-white"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <select
                value={newGroceryItem.card}
                onChange={(e) => setNewGroceryItem({ ...newGroceryItem, card: e.target.value })}
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-green-400 bg-white"
              >
                {creditCards.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex space-x-2 mt-4">
              <button onClick={handleAddGroceryItem} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">
                Add
              </button>
              <button
                onClick={() => {
                  setShowAddGroceryForm(false);
                  setNewGroceryItem({ name: '', price: '', frequencyDays: '', category: 'VITAMINS', card: 'bpi-gold' });
                }}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveGroceryCategory(cat)}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                activeGroceryCategory === cat
                  ? 'bg-gradient-to-r from-green-400 to-green-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map((item) => (
            <div key={item.id} className="bg-gradient-to-br from-green-50 to-lime-50 rounded-lg shadow p-4 border border-green-100">
              {editingGroceryId === item.id ? (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={editGroceryData.name || ''}
                    onChange={(e) => setEditGroceryData({ ...editGroceryData, name: e.target.value })}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-green-400"
                  />
                  <input
                    type="text"
                    inputMode="decimal"
                    value={editGroceryData.price || ''}
                    onChange={(e) => setEditGroceryData({ ...editGroceryData, price: Number(e.target.value) })}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-green-400"
                  />
                  <input
                    type="text"
                    inputMode="numeric"
                    value={editGroceryData.frequencyDays || ''}
                    onChange={(e) => setEditGroceryData({ ...editGroceryData, frequencyDays: Number(e.target.value) })}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-green-400"
                  />
                  <div className="flex space-x-2">
                    <button onClick={handleSaveGroceryEdit} className="flex-1 bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600 transition">
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setEditingGroceryId(null);
                        setEditGroceryData({});
                      }}
                      className="flex-1 bg-gray-400 text-white px-3 py-2 rounded hover:bg-gray-500 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <h4 className="font-semibold text-gray-800 mb-2">{item.name}</h4>
                  <div className="text-lg font-bold text-green-900 mb-2">₱{Number(item.price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                  <div className="text-sm text-gray-600 mb-4">Every {item.frequencyDays} days • {getCardName(item.card)}</div>
                  <div className="flex space-x-2">
                    <button onClick={() => handleEditGroceryItem(item)} className="flex-1 bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 transition text-sm">
                      Edit
                    </button>
                    <button onClick={() => handleDeleteGroceryItem(item.id)} className="flex-1 bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 transition text-sm">
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderPurchases = () => {
    const filteredPurchases =
      purchaseFilter === 'all'
        ? purchases
        : purchaseFilter === 'necessity'
        ? purchases.filter((p) => p.isNecessity)
        : purchases.filter((p) => !p.isNecessity);

    const categorySpending = {};
    const cardSpending = {};
    const monthlySpending = {};

    filteredPurchases.forEach((p) => {
      categorySpending[p.category] = (categorySpending[p.category] || 0) + Number(p.amount);
      cardSpending[p.card] = (cardSpending[p.card] || 0) + Number(p.amount);

      const month = new Date(p.date).toISOString().slice(0, 7);
      monthlySpending[month] = (monthlySpending[month] || 0) + Number(p.amount);
    });

    const categoryData = Object.entries(categorySpending).map(([name, value]) => ({ name, value }));
    const cardData = Object.entries(cardSpending).map(([cardId, value]) => ({
      name: getCardName(cardId),
      value,
    }));
    const monthlyData = Object.entries(monthlySpending)
      .sort()
      .map(([month, value]) => ({
        month: new Date(month + '-01').toLocaleDateString('en-US', { year: '2-digit', month: 'short' }),
        value,
      }));

    const COLORS = ['#fce4ec', '#f8bbd0', '#e1bee7', '#ce93d8', '#bbdefb', '#90caf9'];

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold text-gray-800">Purchases</h2>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Add Purchase</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Description"
              value={newPurchase.description}
              onChange={(e) => setNewPurchase({ ...newPurchase, description: e.target.value })}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-pink-400"
            />
            <input
              type="text"
              inputMode="decimal"
              placeholder="Amount"
              value={newPurchase.amount}
              onChange={(e) => setNewPurchase({ ...newPurchase, amount: e.target.value })}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-pink-400"
            />
            <select
              value={newPurchase.category}
              onChange={(e) => setNewPurchase({ ...newPurchase, category: e.target.value })}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-pink-400 bg-white"
            >
              <option value="Food">Food</option>
              <option value="Transport">Transport</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Utilities">Utilities</option>
              <option value="Health">Health</option>
              <option value="Other">Other</option>
            </select>
            <select
              value={newPurchase.card}
              onChange={(e) => setNewPurchase({ ...newPurchase, card: e.target.value })}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-pink-400 bg-white"
            >
              <option value="">Select Card</option>
              {creditCards.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            <input
              type="date"
              value={newPurchase.date}
              onChange={(e) => setNewPurchase({ ...newPurchase, date: e.target.value })}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-pink-400"
            />
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={newPurchase.isNecessity}
                onChange={(e) => setNewPurchase({ ...newPurchase, isNecessity: e.target.checked })}
                className="w-4 h-4"
              />
              <span className="text-gray-700">Necessity Item</span>
            </label>
          </div>
          <button
            onClick={handleAddPurchase}
            className="mt-4 bg-gradient-to-r from-pink-400 to-pink-500 text-white px-6 py-2 rounded-lg hover:shadow-lg transition"
          >
            Add Purchase
          </button>
        </div>

        <div className="flex space-x-2">
          {['all', 'necessity', 'discretionary'].map((filter) => (
            <button
              key={filter}
              onClick={() => setPurchaseFilter(filter)}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                purchaseFilter === filter
                  ? 'bg-gradient-to-r from-pink-400 to-pink-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>

        {categoryData.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Spending by Category</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ₱${value.toLocaleString()}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `₱${value.toLocaleString()}`} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Spending by Card</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={cardData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ₱${value.toLocaleString()}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {cardData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `₱${value.toLocaleString()}`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {monthlyData.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Monthly Spending Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `₱${value.toLocaleString()}`} />
                <Legend />
                <Bar dataKey="value" fill="#f472b6" name="Spending" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Purchases</h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {filteredPurchases.map((purchase) => (
              <div key={purchase.id} className="flex justify-between items-center p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg border border-pink-100">
                <div>
                  <div className="font-semibold text-gray-800">{purchase.description}</div>
                  <div className="text-sm text-gray-600">
                    {purchase.category} • {getCardName(purchase.card)} • {new Date(purchase.date).toLocaleDateString()}
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="font-bold text-pink-900">₱{Number(purchase.amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                  <button
                    onClick={() => handleDeletePurchase(purchase.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderTravel = () => {
    const selectedTrip = trips.find((t) => t.id === selectedTripId);

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold text-gray-800">Travel</h2>
          {!showTripForm && (
            <button
              onClick={() => setShowTripForm(true)}
              className="bg-gradient-to-r from-teal-400 to-teal-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:shadow-lg transition"
            >
              <Plus size={16} />
              <span>New Trip</span>
            </button>
          )}
        </div>

        {showTripForm && (
          <div className="bg-white rounded-lg shadow-md p-6 border border-teal-200">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Add New Trip</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Trip Name"
                value={newTrip.name}
                onChange={(e) => setNewTrip({ ...newTrip, name: e.target.value })}
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-teal-400"
              />
              <input
                type="text"
                placeholder="Destination"
                value={newTrip.destination}
                onChange={(e) => setNewTrip({ ...newTrip, destination: e.target.value })}
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-teal-400"
              />
              <input
                type="date"
                value={newTrip.startDate}
                onChange={(e) => setNewTrip({ ...newTrip, startDate: e.target.value })}
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-teal-400"
              />
              <input
                type="date"
                value={newTrip.endDate}
                onChange={(e) => setNewTrip({ ...newTrip, endDate: e.target.value })}
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-teal-400"
              />
              <textarea
                placeholder="Notes"
                value={newTrip.notes}
                onChange={(e) => setNewTrip({ ...newTrip, notes: e.target.value })}
                className="md:col-span-2 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-teal-400"
              />
            </div>
            <div className="flex space-x-2 mt-4">
              <button onClick={handleAddTrip} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">
                Create
              </button>
              <button
                onClick={() => {
                  setShowTripForm(false);
                  setNewTrip({ name: '', destination: '', startDate: '', endDate: '', notes: '' });
                }}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Trips</h3>
              <div className="space-y-2">
                {trips.map((trip) => (
                  <div
                    key={trip.id}
                    onClick={() => setSelectedTripId(trip.id)}
                    className={`p-3 rounded-lg cursor-pointer transition ${
                      selectedTripId === trip.id
                        ? 'bg-gradient-to-r from-teal-400 to-teal-500 text-white'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    <div className="font-semibold">{trip.name}</div>
                    <div className="text-sm opacity-75">{trip.destination}</div>
                    <div className="text-xs opacity-60">
                      {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {selectedTrip && (
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">{selectedTrip.name}</h3>
                    <div className="text-gray-600">{selectedTrip.destination}</div>
                    <div className="text-sm text-gray-500 mt-2">
                      {new Date(selectedTrip.startDate).toLocaleDateString()} - {new Date(selectedTrip.endDate).toLocaleDateString()}
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteTrip(selectedTrip.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                  >
                    Delete Trip
                  </button>
                </div>
                {selectedTrip.notes && <div className="text-gray-700 p-3 bg-gray-50 rounded">{selectedTrip.notes}</div>}
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-gray-800">Expenses</h3>
                  {showExpenseForm !== selectedTrip.id && (
                    <button
                      onClick={() => {
                        setShowExpenseForm(selectedTrip.id);
                        setNewExpense({ description: '', amount: '', category: 'Flight', card: '', paid: false, date: '', notes: '' });
                      }}
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition flex items-center space-x-2"
                    >
                      <Plus size={16} />
                      <span>Add Expense</span>
                    </button>
                  )}
                </div>

                {showExpenseForm === selectedTrip.id && (
                  <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Description"
                        value={newExpense.description}
                        onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-green-400"
                      />
                      <input
                        type="text"
                        inputMode="decimal"
                        placeholder="Amount"
                        value={newExpense.amount}
                        onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-green-400"
                      />
                      <select
                        value={newExpense.category}
                        onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
                        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-green-400 bg-white"
                      >
                        <option value="Flight">Flight</option>
                        <option value="Accommodation">Accommodation</option>
                        <option value="Food">Food</option>
                        <option value="Activity">Activity</option>
                        <option value="Transport">Transport</option>
                        <option value="Other">Other</option>
                      </select>
                      <select
                        value={newExpense.card}
                        onChange={(e) => setNewExpense({ ...newExpense, card: e.target.value })}
                        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-green-400 bg-white"
                      >
                        <option value="">Select Card</option>
                        {creditCards.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                      <input
                        type="date"
                        value={newExpense.date}
                        onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
                        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-green-400"
                      />
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={newExpense.paid}
                          onChange={(e) => setNewExpense({ ...newExpense, paid: e.target.checked })}
                          className="w-4 h-4"
                        />
                        <span className="text-gray-700">Paid</span>
                      </label>
                    </div>
                    <textarea
                      placeholder="Notes"
                      value={newExpense.notes}
                      onChange={(e) => setNewExpense({ ...newExpense, notes: e.target.value })}
                      className="w-full mt-4 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-green-400"
                    />
                    <div className="flex space-x-2 mt-4">
                      <button onClick={handleAddExpense} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">
                        Add
                      </button>
                      <button
                        onClick={() => {
                          setShowExpenseForm(null);
                          setNewExpense({ description: '', amount: '', category: 'Flight', card: '', paid: false, date: '', notes: '' });
                        }}
                        className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  {selectedTrip.expenses && selectedTrip.expenses.length > 0 ? (
                    selectedTrip.expenses.map((expense) => (
                      <div key={expense.id} className="flex justify-between items-center p-4 bg-gradient-to-r from-teal-50 to-blue-50 rounded-lg border border-teal-100">
                        <div className="flex-1">
                          <div className="font-semibold text-gray-800">{expense.description}</div>
                          <div className="text-sm text-gray-600">{expense.category} • {expense.date ? new Date(expense.date).toLocaleDateString() : 'No date'}</div>
                          {expense.notes && <div className="text-sm text-gray-500 mt-1">{expense.notes}</div>}
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <div className="font-bold text-teal-900">₱{Number(expense.amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                            <div className={`text-xs font-semibold ${expense.paid ? 'text-green-600' : 'text-red-600'}`}>{expense.paid ? 'Paid' : 'Unpaid'}</div>
                          </div>
                          <button
                            onClick={() => handleDeleteExpense(selectedTrip.id, expense.id)}
                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-gray-500 italic">No expenses yet</div>
                  )}
                </div>

                {selectedTrip.expenses && selectedTrip.expenses.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex justify-between items-center text-lg font-bold">
                      <span>Total Expenses:</span>
                      <span className="text-teal-900">₱{selectedTrip.expenses.reduce((sum, e) => sum + Number(e.amount), 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderInstallments = () => (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">Installments</h2>

      <div className="space-y-4">
        {installments.map((installment) => {
          const progress = ((installment.totalAmount - installment.remainingBalance) / installment.totalAmount) * 100;
          const startDateObj = new Date(installment.startDate);
          const estimatedEndDate = new Date(startDateObj.getTime() + installment.months * 30 * 24 * 60 * 60 * 1000);

          return (
            <div key={installment.id} className="bg-white rounded-lg shadow-md p-6 border border-purple-100">
              {editingInstallmentId === installment.id ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={editInstallmentData.remainingBalance || ''}
                    inputMode="decimal"
                    placeholder="Remaining Balance"
                    onChange={(e) => setEditInstallmentData({ ...editInstallmentData, remainingBalance: Number(e.target.value) })}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-purple-400"
                  />
                  <div className="flex space-x-2">
                    <button onClick={handleSaveInstallmentEdit} className="flex-1 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setEditingInstallmentId(null);
                        setEditInstallmentData({});
                      }}
                      className="flex-1 bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">{installment.name}</h3>
                      <div className="text-sm text-gray-600 mt-1">₱{Number(installment.totalAmount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} • {installment.months} months • {getCardName(installment.card)}</div>
                    </div>
                    <div className="text-sm font-semibold px-3 py-1 rounded-full" style={{
                      backgroundColor: installment.paid ? '#dcfce7' : '#fecaca',
                      color: installment.paid ? '#16a34a' : '#dc2626',
                    }}>
                      {installment.paid ? 'Paid' : 'Active'}
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between items-center text-sm mb-2">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-semibold text-purple-900">{progress.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div className="bg-gradient-to-r from-purple-400 to-purple-600 h-full transition-all duration-300" style={{ width: `${progress}%` }} />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                    <div>
                      <div className="text-gray-600">Monthly Payment</div>
                      <div className="font-semibold text-gray-800">₱{Number(installment.monthlyPayment).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                    </div>
                    <div>
                      <div className="text-gray-600">Remaining</div>
                      <div className="font-semibold text-gray-800">₱{Number(installment.remainingBalance).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                    </div>
                    <div>
                      <div className="text-gray-600">Paid</div>
                      <div className="font-semibold text-green-700">₱{(Number(installment.totalAmount) - Number(installment.remainingBalance)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                    </div>
                    <div>
                      <div className="text-gray-600">Est. End</div>
                      <div className="font-semibold text-gray-800">{estimatedEndDate.toLocaleDateString('en-US', { year: '2-digit', month: 'short' })}</div>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => handlePayInstallmentThisMonth(installment.id)}
                      className="flex-1 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                      disabled={installment.paid}
                    >
                      Pay This Month
                    </button>
                    <button onClick={() => handleEditInstallment(installment)} className="flex-1 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition">
                      Edit
                    </button>
                    <button onClick={() => handleDeleteInstallment(installment.id)} className="flex-1 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(calendarYear, calendarMonth);
    const firstDay = getFirstDayOfMonth(calendarYear, calendarMonth);
    const monthName = new Date(calendarYear, calendarMonth).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold text-gray-800">Calendar</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <button
                  onClick={() => {
                    setCalendarMonth(calendarMonth === 0 ? 11 : calendarMonth - 1);
                    if (calendarMonth === 0) setCalendarYear(calendarYear - 1);
                  }}
                  className="bg-gray-200 hover:bg-gray-300 p-2 rounded transition"
                >
                  <ChevronLeft size={20} />
                </button>
                <h3 className="text-xl font-bold text-gray-800">{monthName}</h3>
                <button
                  onClick={() => {
                    setCalendarMonth(calendarMonth === 11 ? 0 : calendarMonth + 1);
                    if (calendarMonth === 11) setCalendarYear(calendarYear + 1);
                  }}
                  className="bg-gray-200 hover:bg-gray-300 p-2 rounded transition"
                >
                  <ChevronRight size={20} />
                </button>
              </div>

              <div className="grid grid-cols-7 gap-2 mb-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div key={day} className="text-center font-bold text-gray-600 py-2">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-2">
                {days.map((day, idx) => {
                  const events = day ? getEventsForDate(day) : [];
                  const isSelected = selectedDate === day;

                  return (
                    <div
                      key={idx}
                      onClick={() => day && setSelectedDate(day)}
                      className={`min-h-20 p-2 rounded-lg border cursor-pointer transition ${
                        !day
                          ? 'bg-gray-50 border-gray-100'
                          : isSelected
                          ? 'bg-gradient-to-br from-pink-200 to-purple-200 border-pink-400'
                          : 'bg-white border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      {day && (
                        <>
                          <div className="font-semibold text-gray-800 text-sm mb-1">{day}</div>
                          <div className="space-y-1">
                            {events.slice(0, 3).map((event, idx) => (
                              <div key={idx} className={`text-xs px-1 py-0.5 rounded text-white ${event.color} truncate`}>
                                {event.label}
                              </div>
                            ))}
                            {events.length > 3 && <div className="text-xs text-gray-600 px-1">+{events.length - 3} more</div>}
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {selectedDate && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                {new Date(calendarYear, calendarMonth, selectedDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              </h3>

              <div className="space-y-3">
                {getEventsForDate(selectedDate).map((event, idx) => (
                  <div key={idx} className={`p-3 rounded-lg border-l-4 ${event.color} bg-gray-50`}>
                    <div className="font-semibold text-gray-800">{event.label}</div>
                    <div className="text-sm text-gray-600 mt-1">Type: {event.type}</div>
                  </div>
                ))}
                {getEventsForDate(selectedDate).length === 0 && <div className="text-gray-500 italic">No events scheduled</div>}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-blue-50 relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {sakuraPetals.map((petal) => (
          <SakuraPetal
            key={petal.id}
            style={{
              position: 'absolute',
              left: `${petal.left}%`,
              top: `${petal.top}%`,
              opacity: petal.opacity,
              animation: `float ${petal.duration}s ease-in-out infinite`,
              animationDelay: `${petal.delay}s`,
              width: petal.size,
              height: petal.size,
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        <div className="bg-white shadow-lg sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">My Ledger</h1>
              <div className="flex items-center space-x-2 text-gray-600">
                <Clock size={18} />
                <span className="text-sm font-semibold">{currentDate.toLocaleTimeString()}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 overflow-x-auto pb-2">
              {[
                { id: 'dashboard', label: 'Dashboard', icon: Home },
                { id: 'cards', label: 'Credit Cards', icon: CreditCard },
                { id: 'installments', label: 'Installments', icon: Package },
                { id: 'grocery', label: 'Grocery', icon: ShoppingCart },
                { id: 'purchases', label: 'Purchases', icon: DollarSign },
                { id: 'travel', label: 'Travel', icon: Plane },
                { id: 'calendar', label: 'Calendar', icon: Calendar },
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold transition ${
                    activeTab === id
                      ? 'bg-gradient-to-r from-pink-400 to-purple-500 text-white shadow-lg'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  <Icon size={16} />
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'cards' && renderCreditCards()}
          {activeTab === 'grocery' && renderGrocery()}
          {activeTab === 'purchases' && renderPurchases()}
          {activeTab === 'travel' && renderTravel()}
          {activeTab === 'installments' && renderInstallments()}
          {activeTab === 'calendar' && renderCalendar()}
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(-40px) translateX(-10px); }
          75% { transform: translateY(-20px) translateX(10px); }
        }
      `}</style>
    </div>
  );
};

export default MyLedger;
