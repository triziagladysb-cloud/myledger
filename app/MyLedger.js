'use client';

import React, { useState, useEffect, useMemo } from 'react';
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

const MyLedger = () => {
  const [exchangeRate, setExchangeRate] = useState(57);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showSettings, setShowSettings] = useState(false);

  // Initial state with pre-populated data
  const [creditCards, setCreditCards] = useState([
    {
      id: 'union-rewards',
      name: 'Union Bank Rewards Platinum',
      balance: 0,
      rate: 3,
      minPayment: 0,
      statementDay: 6,
      interestPerMonth: 0,
      limit: 45000,
      notes: '',
    },
    {
      id: 'union-cebu',
      name: 'Union Bank Cebu Pacific Platinum',
      balance: 93989.4,
      rate: 3,
      minPayment: 4699.47,
      statementDay: 10,
      interestPerMonth: 2819.68,
      limit: 152000,
      notes: '',
    },
    {
      id: 'bpi-gold',
      name: 'BPI Gold Rewards Card',
      balance: 40177.43,
      rate: 3,
      minPayment: 2008.87,
      statementDay: 15,
      interestPerMonth: 1205.32,
      limit: 136000,
      notes: '',
    },
    {
      id: 'security-wave',
      name: 'Security Bank Wave Card',
      balance: 66961.88,
      rate: 2.5,
      minPayment: 3348.09,
      statementDay: 12,
      interestPerMonth: 1674.05,
      limit: 70000,
      notes: '',
    },
    {
      id: 'eastwest-jcb',
      name: 'East West JCB Gold',
      balance: 116900.35,
      rate: 3,
      minPayment: 5845.02,
      statementDay: 10,
      interestPerMonth: 3507.01,
      limit: 145000,
      notes: '',
    },
    {
      id: 'rcbc-gold',
      name: 'RCBC Gold Flex',
      balance: 62290.36,
      rate: 3,
      minPayment: 3114.52,
      statementDay: 3,
      interestPerMonth: 1868.71,
      limit: 73000,
      notes: '',
    },
    {
      id: 'atome',
      name: 'Atome (Virtual/Inactive)',
      balance: 0,
      rate: 0,
      minPayment: 0,
      statementDay: 18,
      interestPerMonth: 0,
      limit: 81000,
      notes: 'Inactive',
    },
  ]);

  const [purchases, setPurchases] = useState([
    {
      id: 1,
      amount: 500,
      date: '2026-03-20',
      card: 'union-cebu',
      category: 'Food',
      description: 'Groceries',
      isNecessity: true,
    },
  ]);

  const [subscriptions, setSubscriptions] = useState([
    {
      id: 1,
      name: 'HBO Max',
      amount: 199,
      chargeDate: 27,
      card: 'security-wave',
      status: 'Active',
    },
    {
      id: 2,
      name: 'Canva',
      amount: 299,
      chargeDate: 27,
      card: 'security-wave',
      status: 'Active',
    },
    {
      id: 3,
      name: 'Apple TV+',
      amount: 607.99,
      chargeDate: 1,
      card: 'security-wave',
      status: 'Active',
    },
    {
      id: 4,
      name: 'Netflix',
      amount: 625.19,
      chargeDate: 5,
      card: 'bpi-gold',
      status: 'Active',
    },
    {
      id: 5,
      name: 'Spotify',
      amount: 281.79,
      chargeDate: 8,
      card: 'bpi-gold',
      status: 'Active',
    },
    {
      id: 6,
      name: 'Google One',
      amount: 604.99,
      chargeDate: 21,
      card: 'bpi-gold',
      status: 'Active',
    },
  ]);

  const [installments, setInstallments] = useState([
    {
      id: 1,
      name: 'BPI Dryer',
      total: 25000,
      monthlyPayment: 1041.67,
      card: 'bpi-gold',
      startDate: '2025-06-14',
      totalMonths: 24,
      interestRate: 0,
      remaining: 15625,
      userShare: 1,
    },
    {
      id: 2,
      name: 'BPI Mac Mini',
      total: 38469,
      monthlyPayment: 1602.88,
      card: 'bpi-gold',
      startDate: '2025-05-23',
      totalMonths: 24,
      interestRate: 0,
      remaining: 22440.25,
      userShare: 1,
    },
    {
      id: 3,
      name: 'BPI Samsung',
      total: 47513,
      monthlyPayment: 1979.71,
      card: 'bpi-gold',
      startDate: '2025-12-12',
      totalMonths: 24,
      interestRate: 0,
      remaining: 41573.88,
      userShare: 1,
    },
    {
      id: 4,
      name: "BPI Fiancé's Android Phone",
      total: 24990,
      monthlyPayment: 1041.25,
      card: 'bpi-gold',
      startDate: '2025-03-14',
      totalMonths: 24,
      interestRate: 0,
      remaining: 12495,
      userShare: 0,
    },
    {
      id: 5,
      name: 'Shopee SpayLater Christmas Gifts',
      total: 2838.49,
      monthlyPayment: 946.16,
      card: null,
      startDate: '2025-12-12',
      totalMonths: 3,
      interestRate: 0,
      remaining: 946.16,
      userShare: 1,
      paymentType: 'cash',
      dueDay: 5,
    },
    {
      id: 6,
      name: 'Shopee SpayLater Dr. Althea 345',
      total: 1028.32,
      monthlyPayment: 342.77,
      card: null,
      startDate: '2026-03-03',
      totalMonths: 3,
      interestRate: 0,
      remaining: 342.77,
      userShare: 1,
      paymentType: 'cash',
      dueDay: 5,
    },
    {
      id: 7,
      name: 'Shopee SpayLater Room Light',
      total: 1740.22,
      monthlyPayment: 580.07,
      card: null,
      startDate: '2026-03-10',
      totalMonths: 3,
      interestRate: 0,
      remaining: 580.07,
      userShare: 1,
      paymentType: 'cash',
      dueDay: 5,
    },
    {
      id: 8,
      name: 'Shopee SpayLater Detail Make Up',
      total: 1001.73,
      monthlyPayment: 333.91,
      card: null,
      startDate: '2026-03-13',
      totalMonths: 3,
      interestRate: 0,
      remaining: 333.91,
      userShare: 1,
      paymentType: 'cash',
      dueDay: 5,
    },
    {
      id: 9,
      name: 'Shopee SpayLater Ice Maker',
      total: 3889,
      monthlyPayment: 1296.33,
      card: null,
      startDate: '2026-03-22',
      totalMonths: 3,
      interestRate: 0,
      remaining: 1296.33,
      userShare: 1,
      paymentType: 'cash',
      dueDay: 5,
    },
  ]);

  const [groceries, setGroceries] = useState([
    // Vitamins
    {
      id: 1,
      category: 'Vitamins',
      name: 'Vitamin D3 & K2',
      frequency: 'monthly',
      frequencyDays: 30,
      price: 975,
      lastPurchased: '2026-03-01',
      status: 'stocked',
    },
    {
      id: 2,
      category: 'Vitamins',
      name: 'Met Thatione',
      frequency: 'monthly',
      frequencyDays: 30,
      price: 2017,
      lastPurchased: '2026-03-01',
      status: 'stocked',
    },
    {
      id: 3,
      category: 'Vitamins',
      name: 'Cranberry',
      frequency: 'every 2 months',
      frequencyDays: 60,
      price: 1297,
      lastPurchased: '2026-01-15',
      status: 'needs purchase',
    },
    {
      id: 4,
      category: 'Vitamins',
      name: 'Vitamin C',
      frequency: 'monthly',
      frequencyDays: 30,
      price: 280.9,
      lastPurchased: '2026-03-01',
      status: 'stocked',
    },
    {
      id: 5,
      category: 'Vitamins',
      name: 'Vitamin E',
      frequency: 'every 2 months',
      frequencyDays: 60,
      price: 280.9,
      lastPurchased: '2026-01-15',
      status: 'needs purchase',
    },
    {
      id: 6,
      category: 'Vitamins',
      name: 'Magnesium Pure',
      frequency: 'every 45 days',
      frequencyDays: 45,
      price: 1537,
      lastPurchased: '2026-02-10',
      status: 'needs purchase',
    },
    // Skincare
    {
      id: 7,
      category: 'Skincare',
      name: 'Toner Celeteque',
      frequency: 'quarterly',
      frequencyDays: 90,
      price: 194,
      lastPurchased: '2025-12-15',
      status: 'needs purchase',
    },
    {
      id: 8,
      category: 'Skincare',
      name: 'Keana Rice Pack',
      frequency: 'every 2 months',
      frequencyDays: 60,
      price: 468.17,
      lastPurchased: '2026-01-15',
      status: 'needs purchase',
    },
    {
      id: 9,
      category: 'Skincare',
      name: 'Keana Rice Face Wash',
      frequency: 'every 2 months',
      frequencyDays: 60,
      price: 280.9,
      lastPurchased: '2026-01-15',
      status: 'needs purchase',
    },
    {
      id: 10,
      category: 'Skincare',
      name: 'Melano CC',
      frequency: 'yearly',
      frequencyDays: 365,
      price: 329.59,
      lastPurchased: '2025-03-15',
      status: 'needs purchase',
    },
    {
      id: 11,
      category: 'Skincare',
      name: 'Hada Labo',
      frequency: 'yearly',
      frequencyDays: 365,
      price: 370.79,
      lastPurchased: '2025-04-10',
      status: 'needs purchase',
    },
    {
      id: 12,
      category: 'Skincare',
      name: '345 Cream',
      frequency: 'quarterly',
      frequencyDays: 90,
      price: 1050,
      lastPurchased: '2025-12-15',
      status: 'needs purchase',
    },
    // Toiletries
    {
      id: 13,
      category: 'Toiletries',
      name: 'Shampoo',
      frequency: 'quarterly',
      frequencyDays: 90,
      price: 130.34,
      lastPurchased: '2025-12-15',
      status: 'needs purchase',
    },
    {
      id: 14,
      category: 'Toiletries',
      name: 'Deo',
      frequency: 'quarterly',
      frequencyDays: 90,
      price: 178,
      lastPurchased: '2025-12-15',
      status: 'needs purchase',
    },
    {
      id: 15,
      category: 'Toiletries',
      name: 'Toothpaste',
      frequency: 'every 4 months',
      frequencyDays: 120,
      price: 215,
      lastPurchased: '2025-11-15',
      status: 'needs purchase',
    },
    {
      id: 16,
      category: 'Toiletries',
      name: 'Conditioner',
      frequency: 'quarterly',
      frequencyDays: 90,
      price: 130.34,
      lastPurchased: '2025-12-15',
      status: 'needs purchase',
    },
    {
      id: 17,
      category: 'Toiletries',
      name: 'Lactacyd',
      frequency: 'every 6 months',
      frequencyDays: 180,
      price: 542,
      lastPurchased: '2025-09-15',
      status: 'needs purchase',
    },
    {
      id: 18,
      category: 'Toiletries',
      name: 'Safeguard',
      frequency: 'every 6 months',
      frequencyDays: 180,
      price: 488,
      lastPurchased: '2025-09-15',
      status: 'needs purchase',
    },
    {
      id: 19,
      category: 'Toiletries',
      name: 'Milk Soap',
      frequency: 'every 6 months',
      frequencyDays: 180,
      price: 179.03,
      lastPurchased: '2025-09-15',
      status: 'needs purchase',
    },
    {
      id: 20,
      category: 'Toiletries',
      name: 'Cotton Buds',
      frequency: 'quarterly',
      frequencyDays: 90,
      price: 95,
      lastPurchased: '2025-12-15',
      status: 'needs purchase',
    },
    {
      id: 21,
      category: 'Toiletries',
      name: 'Cotton Pads',
      frequency: 'quarterly',
      frequencyDays: 90,
      price: 99,
      lastPurchased: '2025-12-15',
      status: 'needs purchase',
    },
    {
      id: 22,
      category: 'Toiletries',
      name: 'Tooth Brush',
      frequency: 'quarterly',
      frequencyDays: 90,
      price: 974,
      lastPurchased: '2025-12-15',
      status: 'needs purchase',
    },
    {
      id: 23,
      category: 'Toiletries',
      name: 'Napkin',
      frequency: 'quarterly',
      frequencyDays: 90,
      price: 535,
      lastPurchased: '2025-12-15',
      status: 'needs purchase',
    },
    {
      id: 24,
      category: 'Toiletries',
      name: 'Dashing',
      frequency: 'monthly',
      frequencyDays: 30,
      price: 800,
      lastPurchased: '2026-03-01',
      status: 'stocked',
    },
    {
      id: 25,
      category: 'Toiletries',
      name: 'Haircut',
      frequency: 'yearly',
      frequencyDays: 365,
      price: 800,
      lastPurchased: '2025-03-15',
      status: 'needs purchase',
    },
    {
      id: 26,
      category: 'Toiletries',
      name: 'Hand Wash',
      frequency: 'every 6 months',
      frequencyDays: 180,
      price: 107.87,
      lastPurchased: '2025-09-15',
      status: 'needs purchase',
    },
    // Household
    {
      id: 27,
      category: 'Household',
      name: 'Ariel Liquid 4-pack',
      frequency: 'monthly',
      frequencyDays: 30,
      price: 1811,
      lastPurchased: '2026-03-01',
      status: 'stocked',
    },
    {
      id: 28,
      category: 'Household',
      name: 'Ariel Powder',
      frequency: 'monthly',
      frequencyDays: 30,
      price: 561,
      lastPurchased: '2026-03-01',
      status: 'stocked',
    },
    {
      id: 29,
      category: 'Household',
      name: 'Downy 2-pack',
      frequency: 'monthly',
      frequencyDays: 30,
      price: 838,
      lastPurchased: '2026-03-01',
      status: 'stocked',
    },
    {
      id: 30,
      category: 'Household',
      name: 'Zonrox',
      frequency: 'monthly',
      frequencyDays: 30,
      price: 283,
      lastPurchased: '2026-03-01',
      status: 'stocked',
    },
    {
      id: 31,
      category: 'Household',
      name: 'Albatross',
      frequency: 'monthly',
      frequencyDays: 30,
      price: 192,
      lastPurchased: '2026-03-01',
      status: 'stocked',
    },
  ]);

  const [trips, setTrips] = useState([
    {
      id: 1,
      name: 'Shanghai Trip',
      destination: 'Shanghai, China',
      startDate: '2026-06-01',
      endDate: '2026-06-15',
      expenses: [
        {
          id: 1,
          type: 'flight',
          description: 'Round trip flight',
          amount: 0,
          card: 'union-cebu',
          paid: false,
        },
        {
          id: 2,
          type: 'hotel',
          description: 'Hotel accommodation',
          amount: 0,
          card: 'union-cebu',
          paid: false,
        },
        {
          id: 3,
          type: 'activities',
          description: 'Klook activities',
          amount: 0,
          card: null,
          paid: false,
        },
      ],
    },
  ]);

  const [filterCard, setFilterCard] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterDateRange, setFilterDateRange] = useState({
    start: '2026-01-01',
    end: '2026-12-31',
  });

  const [editingCard, setEditingCard] = useState(null);
  const [newPurchase, setNewPurchase] = useState({
    amount: '',
    date: new Date().toISOString().split('T')[0],
    card: creditCards[0]?.id || '',
    category: 'Food',
    description: '',
    isNecessity: false,
  });

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem(
      'myLedgerData',
      JSON.stringify({
        creditCards,
        purchases,
        subscriptions,
        installments,
        groceries,
        trips,
        exchangeRate,
      })
    );
  }, [creditCards, purchases, subscriptions, installments, groceries, trips, exchangeRate]);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('myLedgerData');
    if (saved) {
      const data = JSON.parse(saved);
      setCreditCards(data.creditCards || creditCards);
      setPurchases(data.purchases || purchases);
      setSubscriptions(data.subscriptions || subscriptions);
      setInstallments(data.installments || installments);
      setGroceries(data.groceries || groceries);
      setTrips(data.trips || trips);
      setExchangeRate(data.exchangeRate || exchangeRate);
    }
  }, []);

  // Calculations
  const totalDebt = useMemo(() => {
    return creditCards.reduce((sum, card) => sum + card.balance, 0);
  }, [creditCards]);

  const totalLimit = useMemo(() => {
    return creditCards.reduce((sum, card) => sum + card.limit, 0);
  }, [creditCards]);

  const totalMinPayment = useMemo(() => {
    return creditCards.reduce((sum, card) => sum + card.minPayment, 0);
  }, [creditCards]);

  const totalInterestPerMonth = useMemo(() => {
    return creditCards.reduce((sum, card) => sum + card.interestPerMonth, 0);
  }, [creditCards]);

  const totalSubscriptions = useMemo(() => {
    return subscriptions.reduce((sum, sub) => sum + sub.amount, 0);
  }, [subscriptions]);

  const totalInstallments = useMemo(() => {
    return installments.reduce((sum, inst) => sum + inst.monthlyPayment * inst.userShare, 0);
  }, [installments]);

  const monthlyIncomeUSD = useMemo(() => {
    const moleStreetBiweekly = 816.54;
    const moleMo = (moleStreetBiweekly * 26) / 12;
    const archyMo = 1550;
    return moleMo + archyMo;
  }, []);

  const monthlyIncome = useMemo(() => {
    return monthlyIncomeUSD * exchangeRate;
  }, [monthlyIncomeUSD, exchangeRate]);

  const fixedBills = [
    { name: 'PruLife Insurance', amount: 3000, dueDate: 15 },
    { name: 'Globe Phone Plan', amount: 4893.84, dueDate: 7 },
  ];

  const totalFixedBills = useMemo(() => {
    return fixedBills.reduce((sum, bill) => sum + bill.amount, 0);
  }, []);

  const spayLaterMonthly = useMemo(() => {
    return installments
      .filter((inst) => inst.paymentType === 'cash')
      .reduce((sum, inst) => sum + inst.monthlyPayment * inst.userShare, 0);
  }, [installments]);

  const getDaysUntilStatementDue = (statementDay) => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const statementDate = new Date(currentYear, currentMonth, statementDay);

    if (statementDate < today) {
      statementDate.setMonth(statementDate.getMonth() + 1);
    }

    const daysUntil = Math.ceil((statementDate - today) / (1000 * 60 * 60 * 24));
    return Math.max(daysUntil, 1);
  };

  const getUtilizationColor = (utilization) => {
    if (utilization <= 30) return 'bg-gradient-to-r from-green-300 to-green-500';
    if (utilization <= 70) return 'bg-gradient-to-r from-yellow-300 to-yellow-500';
    return 'bg-gradient-to-r from-red-300 to-red-500';
  };

  const handleAddPurchase = () => {
    if (!newPurchase.amount || !newPurchase.card) return;

    const purchase = {
      id: Date.now(),
      ...newPurchase,
      amount: parseFloat(newPurchase.amount),
    };

    setPurchases([...purchases, purchase]);

    const updatedCards = creditCards.map((card) => {
      if (card.id === newPurchase.card) {
        return { ...card, balance: card.balance + parseFloat(newPurchase.amount) };
      }
      return card;
    });
    setCreditCards(updatedCards);

    setNewPurchase({
      amount: '',
      date: new Date().toISOString().split('T')[0],
      card: creditCards[0]?.id || '',
      category: 'Food',
      description: '',
      isNecessity: false,
    });
  };

  const handleDeletePurchase = (id) => {
    const purchase = purchases.find((p) => p.id === id);
    if (purchase) {
      const updatedCards = creditCards.map((card) => {
        if (card.id === purchase.card) {
          return { ...card, balance: Math.max(0, card.balance - purchase.amount) };
        }
        return card;
      });
      setCreditCards(updatedCards);
      setPurchases(purchases.filter((p) => p.id !== id));
    }
  };

  const handleUpdateCard = (id, updates) => {
    setCreditCards(creditCards.map((card) => (card.id === id ? { ...card, ...updates } : card)));
  };

  const handleAddSubscription = () => {
    const newSub = {
      id: Date.now(),
      name: 'New Subscription',
      amount: 0,
      chargeDate: 1,
      card: creditCards[0]?.id || '',
      status: 'Active',
    };
    setSubscriptions([...subscriptions, newSub]);
  };

  const handleDeleteSubscription = (id) => {
    setSubscriptions(subscriptions.filter((s) => s.id !== id));
  };

  const handleAddInstallment = () => {
    const newInst = {
      id: Date.now(),
      name: 'New Installment',
      total: 0,
      monthlyPayment: 0,
      card: creditCards[0]?.id || '',
      startDate: new Date().toISOString().split('T')[0],
      totalMonths: 12,
      interestRate: 0,
      remaining: 0,
      userShare: 1,
    };
    setInstallments([...installments, newInst]);
  };

  const handleDeleteInstallment = (id) => {
    setInstallments(installments.filter((i) => i.id !== id));
  };

  const handleAddTrip = () => {
    const newTrip = {
      id: Date.now(),
      name: 'New Trip',
      destination: '',
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date().toISOString().split('T')[0],
      expenses: [],
    };
    setTrips([...trips, newTrip]);
  };

  const handleDeleteTrip = (id) => {
    setTrips(trips.filter((t) => t.id !== id));
  };

  const handleAddTripExpense = (tripId) => {
    const updatedTrips = trips.map((trip) => {
      if (trip.id === tripId) {
        return {
          ...trip,
          expenses: [
            ...trip.expenses,
            {
              id: Date.now(),
              type: 'other',
              description: 'New expense',
              amount: 0,
              card: null,
              paid: false,
            },
          ],
        };
      }
      return trip;
    });
    setTrips(updatedTrips);
  };

  const handleUpdateTripExpense = (tripId, expenseId, updates) => {
    const updatedTrips = trips.map((trip) => {
      if (trip.id === tripId) {
        return {
          ...trip,
          expenses: trip.expenses.map((exp) => (exp.id === expenseId ? { ...exp, ...updates } : exp)),
        };
      }
      return trip;
    });
    setTrips(updatedTrips);
  };

  const handleDeleteTripExpense = (tripId, expenseId) => {
    const updatedTrips = trips.map((trip) => {
      if (trip.id === tripId) {
        return {
          ...trip,
          expenses: trip.expenses.filter((exp) => exp.id !== expenseId),
        };
      }
      return trip;
    });
    setTrips(updatedTrips);
  };

  const handleMarkGroceryPurchased = (id) => {
    const today = new Date();
    const updatedGroceries = groceries.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          lastPurchased: today.toISOString().split('T')[0],
          status: 'stocked',
        };
      }
      return item;
    });
    setGroceries(updatedGroceries);
  };

  const filteredPurchases = useMemo(() => {
    return purchases.filter((p) => {
      const cardMatch = filterCard === 'all' || p.card === filterCard;
      const categoryMatch = filterCategory === 'all' || p.category === filterCategory;
      const dateMatch = p.date >= filterDateRange.start && p.date <= filterDateRange.end;
      return cardMatch && categoryMatch && dateMatch;
    });
  }, [purchases, filterCard, filterCategory, filterDateRange]);

  const purchasesByCategory = useMemo(() => {
    const breakdown = {};
    purchases.forEach((p) => {
      if (!breakdown[p.category]) breakdown[p.category] = 0;
      breakdown[p.category] += p.amount;
    });
    return Object.entries(breakdown).map(([name, value]) => ({ name, value }));
  }, [purchases]);

  const purchasesByCard = useMemo(() => {
    const breakdown = {};
    purchases.forEach((p) => {
      const cardName =
        creditCards.find((c) => c.id === p.card)?.name.substring(0, 15) || 'Unknown';
      if (!breakdown[cardName]) breakdown[cardName] = 0;
      breakdown[cardName] += p.amount;
    });
    return Object.entries(breakdown).map(([name, value]) => ({ name, value }));
  }, [purchases, creditCards]);

  const COLORS = [
    '#7c3aed',
    '#ec4899',
    '#8b5cf6',
    '#f472b6',
    '#a855f7',
    '#f97316',
    '#06b6d4',
    '#10b981',
  ];

  const groceriesByCategory = useMemo(() => {
    return {
      Vitamins: groceries.filter((g) => g.category === 'Vitamins'),
      Skincare: groceries.filter((g) => g.category === 'Skincare'),
      Toiletries: groceries.filter((g) => g.category === 'Toiletries'),
      Household: groceries.filter((g) => g.category === 'Household'),
    };
  }, [groceries]);

  const calculateMonthlyEquivalent = (frequencyDays, price) => {
    return (price / frequencyDays) * 30;
  };

  const getNextPurchaseDate = (lastPurchased, frequencyDays) => {
    const last = new Date(lastPurchased);
    const next = new Date(last.getTime() + frequencyDays * 24 * 60 * 60 * 1000);
    return next.toISOString().split('T')[0];
  };

  const exportData = () => {
    const data = {
      creditCards,
      purchases,
      subscriptions,
      installments,
      groceries,
      trips,
      exchangeRate,
      exportDate: new Date().toISOString(),
    };
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `MyLedger_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  };

  const getCurrentMonth = () => {
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() };
  };

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getCalendarDays = (month, year) => {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = getDaysInMonth(month, year);
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return days;
  };

  const getEventsForDay = (day, month, year) => {
    if (!day) return [];

    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const events = [];

    // Pay dates
    if (day === 1 || day === 15) {
      events.push({ type: 'income', label: 'Pay Day' });
    }

    // Statement dates
    creditCards.forEach((card) => {
      if (card.statementDay === day) {
        events.push({ type: 'statement', label: 'Statement' });
      }
    });

    // Bill due dates
    fixedBills.forEach((bill) => {
      if (bill.dueDate === day) {
        events.push({ type: 'bill', label: bill.name.substring(0, 10) });
      }
    });

    // Subscriptions
    subscriptions.forEach((sub) => {
      if (sub.chargeDate === day) {
        events.push({ type: 'subscription', label: sub.name.substring(0, 10) });
      }
    });

    return events;
  };

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const { month: currentMonth, year: currentYear } = getCurrentMonth();
  const calendarDays = getCalendarDays(currentMonth, currentYear);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <DollarSign className="w-8 h-8" />
            <div>
              <h1 className="text-3xl font-bold">MyLedger</h1>
              <p className="text-purple-100 text-sm">Personal Finance Dashboard for Trish</p>
            </div>
          </div>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 hover:bg-white/20 rounded-lg transition"
          >
            <Settings className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="bg-white border-b border-purple-200 p-4 max-w-7xl mx-auto">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Exchange Rate (₱ per $1 USD)
              </label>
              <input
                type="number"
                value={exchangeRate}
                onChange={(e) => setExchangeRate(parseFloat(e.target.value))}
                className="w-full max-w-xs px-4 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={exportData}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:shadow-lg transition"
              >
                <Download className="w-4 h-4" />
                Export Data
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="sticky top-20 z-40 bg-white border-b border-purple-200 shadow-sm max-w-7xl mx-auto">
        <div className="flex overflow-x-auto px-4">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: Home },
            { id: 'purchases', label: 'Purchases', icon: ShoppingCart },
            { id: 'cards', label: 'Credit Cards', icon: CreditCard },
            { id: 'travel', label: 'Travel', icon: Plane },
            { id: 'groceries', label: 'Groceries', icon: Package },
            { id: 'calendar', label: 'Calendar', icon: Calendar },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-4 py-3 border-b-2 transition whitespace-nowrap ${
                activeTab === id
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-600 hover:text-purple-600'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* DASHBOARD TAB */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Income Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-green-400 to-emerald-500 text-white rounded-xl p-6 shadow-lg">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-green-100 text-sm">Monthly Income</p>
                    <p className="text-3xl font-bold mt-2">₱{monthlyIncome.toLocaleString('en-PH', { minimumFractionDigits: 2 })}</p>
                    <p className="text-green-100 text-xs mt-2">
                      Mole Street: $816.54 biweekly (Operations Associate)
                    </p>
                    <p className="text-green-100 text-xs">
                      Archy: $1,550/mo (Marketing Assistant - unstable)
                    </p>
                  </div>
                  <TrendingUp className="w-8 h-8" />
                </div>
              </div>

              <div className="bg-gradient-to-br from-red-400 to-red-600 text-white rounded-xl p-6 shadow-lg">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-red-100 text-sm">Total Credit Card Debt</p>
                    <p className="text-3xl font-bold mt-2">₱{totalDebt.toLocaleString('en-PH', { minimumFractionDigits: 2 })}</p>
                    <p className="text-red-100 text-xs mt-2">
                      Utilization: {((totalDebt / totalLimit) * 100).toFixed(1)}%
                    </p>
                  </div>
                  <TrendingDown className="w-8 h-8" />
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-400 to-cyan-500 text-white rounded-xl p-6 shadow-lg">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-blue-100 text-sm">Monthly Obligations</p>
                    <p className="text-3xl font-bold mt-2">
                      ₱{(totalMinPayment + totalSubscriptions + totalInstallments + totalFixedBills).toLocaleString('en-PH', { minimumFractionDigits: 2 })}
                    </p>
                    <p className="text-blue-100 text-xs mt-2">Min payments, subs, bills, installments</p>
                  </div>
                  <AlertTriangle className="w-8 h-8" />
                </div>
              </div>
            </div>

            {/* Credit Cards Summary */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-purple-900 mb-4 flex items-center gap-2">
                <CreditCard className="w-6 h-6" />
                Credit Card Breakdown
              </h2>
              <div className="space-y-3">
                {creditCards.map((card) => {
                  const utilization = (card.balance / card.limit) * 100;
                  return (
                    <div key={card.id} className="border border-purple-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-semibold text-gray-800">{card.name}</p>
                          <p className="text-sm text-gray-600">
                            Balance: ₱{card.balance.toLocaleString('en-PH', { minimumFractionDigits: 2 })} / Limit: ₱
                            {card.limit.toLocaleString('en-PH', { minimumFractionDigits: 0 })}
                          </p>
                        </div>
                        <span className="text-lg font-bold text-purple-600">
                          {utilization.toFixed(1)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${getUtilizationColor(utilization)}`}
                          style={{ width: `${Math.min(utilization, 100)}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Subscriptions */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-purple-900 mb-4 flex items-center gap-2">
                <Bell className="w-6 h-6" />
                Active Subscriptions (₱{totalSubscriptions.toLocaleString('en-PH', { minimumFractionDigits: 2 })}/mo)
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {subscriptions.map((sub) => (
                  <div key={sub.id} className="border border-purple-200 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-semibold text-gray-800">{sub.name}</p>
                        <p className="text-sm text-gray-600">₱{sub.amount.toLocaleString('en-PH', { minimumFractionDigits: 2 })} • Due {sub.chargeDate}th</p>
                      </div>
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded">
                        {sub.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Installments */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-purple-900 mb-4 flex items-center gap-2">
                <Package className="w-6 h-6" />
                Active Installments (₱{totalInstallments.toLocaleString('en-PH', { minimumFractionDigits: 2 })}/mo)
              </h2>
              <div className="space-y-3">
                {installments.map((inst) => {
                  const monthsRemaining = Math.ceil(inst.remaining / inst.monthlyPayment);
                  return (
                    <div key={inst.id} className="border border-purple-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-semibold text-gray-800">{inst.name}</p>
                          <p className="text-sm text-gray-600">
                            ₱{(inst.monthlyPayment * inst.userShare).toLocaleString('en-PH', { minimumFractionDigits: 2 })}/mo • {monthsRemaining} months remaining
                          </p>
                          {inst.userShare === 0 && (
                            <p className="text-xs text-orange-600 mt-1">Fiancé pays</p>
                          )}
                        </div>
                        <span className="text-lg font-bold text-pink-600">
                          ₱{inst.remaining.toLocaleString('en-PH', { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="h-2 rounded-full bg-gradient-to-r from-pink-400 to-purple-500"
                          style={{
                            width: `${100 - (inst.remaining / inst.total) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Fixed Bills */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-purple-900 mb-4 flex items-center gap-2">
                <Home className="w-6 h-6" />
                Fixed Monthly Bills (₱{totalFixedBills.toLocaleString('en-PH', { minimumFractionDigits: 2 })}/mo)
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {fixedBills.map((bill, idx) => (
                  <div key={idx} className="border border-purple-200 rounded-lg p-4">
                    <p className="font-semibold text-gray-800">{bill.name}</p>
                    <div className="flex items-baseline justify-between mt-2">
                      <p className="text-sm text-gray-600">Due {bill.dueDate}th</p>
                      <p className="text-2xl font-bold text-purple-600">
                        ₱{bill.amount.toLocaleString('en-PH', { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cash Flow Summary */}
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4">Monthly Cash Flow</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-purple-100 text-sm">Income</p>
                  <p className="text-2xl font-bold">₱{monthlyIncome.toLocaleString('en-PH', { minimumFractionDigits: 0 })}</p>
                </div>
                <div>
                  <p className="text-purple-100 text-sm">Min Payments</p>
                  <p className="text-2xl font-bold">₱{totalMinPayment.toLocaleString('en-PH', { minimumFractionDigits: 0 })}</p>
                </div>
                <div>
                  <p className="text-purple-100 text-sm">Subscriptions</p>
                  <p className="text-2xl font-bold">₱{totalSubscriptions.toLocaleString('en-PH', { minimumFractionDigits: 0 })}</p>
                </div>
                <div>
                  <p className="text-purple-100 text-sm">Monthly Buffer</p>
                  <p className="text-2xl font-bold">₱2,500</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-purple-300">
                <p className="text-purple-100 text-sm mb-1">Available after obligations</p>
                <p className="text-3xl font-bold">
                  ₱
                  {(
                    monthlyIncome -
                    totalMinPayment -
                    totalSubscriptions -
                    totalInstallments -
                    totalFixedBills
                  ).toLocaleString('en-PH', { minimumFractionDigits: 0 })}
                </p>
              </div>
            </div>

            {/* Reminders */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-purple-900 mb-4 flex items-center gap-2">
                <Bell className="w-6 h-6" />
                Reminders & Alerts
              </h2>
              <div className="space-y-3">
                <div className="border-l-4 border-orange-400 bg-orange-50 p-4 rounded">
                  <p className="font-semibold text-orange-900">Upcoming Statement Dates</p>
                  <p className="text-sm text-orange-700 mt-2">
                    {creditCards
                      .map(
                        (card) =>
                          `${card.name}: ${getDaysUntilStatementDue(card.statementDay)} days`
                      )
                      .join(' • ')}
                  </p>
                </div>
                <div className="border-l-4 border-red-400 bg-red-50 p-4 rounded">
                  <p className="font-semibold text-red-900">High Utilization Cards</p>
                  <div className="text-sm text-red-700 mt-2 space-y-1">
                    {creditCards
                      .filter((card) => (card.balance / card.limit) * 100 > 70)
                      .map((card) => (
                        <p key={card.id}>
                          {card.name}: {((card.balance / card.limit) * 100).toFixed(1)}%
                        </p>
                      ))}
                  </div>
                </div>
                <div className="border-l-4 border-blue-400 bg-blue-50 p-4 rounded">
                  <p className="font-semibold text-blue-900">Grocery Items Needing Replenishment</p>
                  <p className="text-sm text-blue-700 mt-2">
                    {groceries.filter((g) => g.status === 'needs purchase').length} items need
                    replenishment
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PURCHASES TAB */}
        {activeTab === 'purchases' && (
          <div className="space-y-6">
            {/* Add Purchase Form */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-purple-900 mb-4 flex items-center gap-2">
                <Plus className="w-6 h-6" />
                Add New Purchase
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <input
                  type="number"
                  placeholder="Amount (₱)"
                  value={newPurchase.amount}
                  onChange={(e) => setNewPurchase({ ...newPurchase, amount: e.target.value })}
                  className="px-4 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <input
                  type="date"
                  value={newPurchase.date}
                  onChange={(e) => setNewPurchase({ ...newPurchase, date: e.target.value })}
                  className="px-4 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <select
                  value={newPurchase.card}
                  onChange={(e) => setNewPurchase({ ...newPurchase, card: e.target.value })}
                  className="px-4 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  {creditCards.map((card) => (
                    <option key={card.id} value={card.id}>
                      {card.name.substring(0, 20)}
                    </option>
                  ))}
                </select>
                <select
                  value={newPurchase.category}
                  onChange={(e) => setNewPurchase({ ...newPurchase, category: e.target.value })}
                  className="px-4 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  {[
                    'Food',
                    'Transport',
                    'Shopping',
                    'Bills',
                    'Travel',
                    'Entertainment',
                    'Health',
                    'Groceries',
                    'Other',
                  ].map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Description"
                  value={newPurchase.description}
                  onChange={(e) => setNewPurchase({ ...newPurchase, description: e.target.value })}
                  className="px-4 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newPurchase.isNecessity}
                    onChange={(e) => setNewPurchase({ ...newPurchase, isNecessity: e.target.checked })}
                    className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                  />
                  <span className="text-gray-700">Is Necessity/Recurring Item</span>
                </label>
              </div>
              <button
                onClick={handleAddPurchase}
                className="mt-4 w-full md:w-auto px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:shadow-lg transition flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Purchase
              </button>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-semibold text-gray-800 mb-4">Filters</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <select
                  value={filterCard}
                  onChange={(e) => setFilterCard(e.target.value)}
                  className="px-4 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="all">All Cards</option>
                  {creditCards.map((card) => (
                    <option key={card.id} value={card.id}>
                      {card.name.substring(0, 25)}
                    </option>
                  ))}
                </select>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="px-4 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="all">All Categories</option>
                  {[
                    'Food',
                    'Transport',
                    'Shopping',
                    'Bills',
                    'Travel',
                    'Entertainment',
                    'Health',
                    'Groceries',
                    'Other',
                  ].map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                <div className="flex gap-2">
                  <input
                    type="date"
                    value={filterDateRange.start}
                    onChange={(e) =>
                      setFilterDateRange({ ...filterDateRange, start: e.target.value })
                    }
                    className="flex-1 px-4 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <input
                    type="date"
                    value={filterDateRange.end}
                    onChange={(e) =>
                      setFilterDateRange({ ...filterDateRange, end: e.target.value })
                    }
                    className="flex-1 px-4 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="font-bold text-gray-800 mb-4">Purchases by Category</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={purchasesByCategory}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {purchasesByCategory.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="font-bold text-gray-800 mb-4">Purchases by Card</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={purchasesByCard}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {purchasesByCard.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Purchase History Table */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-purple-900 mb-4">Purchase History</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-purple-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-800">Date</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-800">Description</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-800">Category</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-800">Card</th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-800">Amount</th>
                      <th className="text-center py-3 px-4 font-semibold text-gray-800">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPurchases.map((purchase) => (
                      <tr
                        key={purchase.id}
                        className="border-b border-purple-100 hover:bg-purple-50 transition"
                      >
                        <td className="py-3 px-4">{purchase.date}</td>
                        <td className="py-3 px-4">{purchase.description}</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded">
                            {purchase.category}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-xs">
                          {creditCards.find((c) => c.id === purchase.card)?.name.substring(0, 15)}
                        </td>
                        <td className="py-3 px-4 text-right font-semibold">
                          ₱{purchase.amount.toLocaleString('en-PH', { minimumFractionDigits: 2 })}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <button
                            onClick={() => handleDeletePurchase(purchase.id)}
                            className="text-red-500 hover:text-red-700 transition"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* CREDIT CARDS TAB */}
        {activeTab === 'cards' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              {creditCards.map((card) => {
                const utilization = (card.balance / card.limit) * 100;
                const daysUntilDue = getDaysUntilStatementDue(card.statementDay);

                return (
                  <div
                    key={card.id}
                    className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl shadow-lg p-6 border border-purple-200"
                  >
                    {editingCard === card.id ? (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <input
                            type="text"
                            value={card.name}
                            onChange={(e) =>
                              handleUpdateCard(card.id, { name: e.target.value })
                            }
                            placeholder="Card Name"
                            className="px-4 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                          <input
                            type="number"
                            value={card.balance}
                            onChange={(e) =>
                              handleUpdateCard(card.id, { balance: parseFloat(e.target.value) })
                            }
                            placeholder="Balance"
                            className="px-4 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                          <input
                            type="number"
                            value={card.rate}
                            onChange={(e) =>
                              handleUpdateCard(card.id, { rate: parseFloat(e.target.value) })
                            }
                            placeholder="Interest Rate %"
                            className="px-4 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                          <input
                            type="number"
                            value={card.limit}
                            onChange={(e) =>
                              handleUpdateCard(card.id, { limit: parseFloat(e.target.value) })
                            }
                            placeholder="Credit Limit"
                            className="px-4 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                          <input
                            type="number"
                            value={card.minPayment}
                            onChange={(e) =>
                              handleUpdateCard(card.id, { minPayment: parseFloat(e.target.value) })
                            }
                            placeholder="Min Payment"
                            className="px-4 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                          <input
                            type="number"
                            value={card.statementDay}
                            onChange={(e) =>
                              handleUpdateCard(card.id, { statementDay: parseInt(e.target.value) })
                            }
                            placeholder="Statement Day"
                            className="px-4 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                        </div>
                        <button
                          onClick={() => setEditingCard(null)}
                          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:shadow-lg transition"
                        >
                          <Save className="w-4 h-4" />
                          Save Changes
                        </button>
                      </div>
                    ) : (
                      <div>
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-gray-800">{card.name}</h3>
                            {card.notes && <p className="text-sm text-gray-600 mt-1">{card.notes}</p>}
                          </div>
                          <button
                            onClick={() => setEditingCard(card.id)}
                            className="text-purple-600 hover:text-purple-800 transition"
                          >
                            <Edit2 className="w-5 h-5" />
                          </button>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div>
                            <p className="text-gray-600 text-sm">Balance</p>
                            <p className="text-2xl font-bold text-gray-800">
                              ₱{card.balance.toLocaleString('en-PH', { minimumFractionDigits: 2 })}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-600 text-sm">Limit</p>
                            <p className="text-2xl font-bold text-gray-800">
                              ₱{card.limit.toLocaleString('en-PH', { minimumFractionDigits: 0 })}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-600 text-sm">Min Payment</p>
                            <p className="text-2xl font-bold text-gray-800">
                              ₱{card.minPayment.toLocaleString('en-PH', { minimumFractionDigits: 2 })}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-600 text-sm">Interest/mo</p>
                            <p className="text-2xl font-bold text-gray-800">
                              ₱{card.interestPerMonth.toLocaleString('en-PH', { minimumFractionDigits: 2 })}
                            </p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-700 font-semibold">
                              Utilization: {utilization.toFixed(1)}%
                            </span>
                            <span className="text-sm text-gray-600">
                              {daysUntilDue} days until statement due
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div
                              className={`h-3 rounded-full ${getUtilizationColor(utilization)}`}
                              style={{ width: `${Math.min(utilization, 100)}%` }}
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4 pt-4 border-t border-purple-200">
                          <div>
                            <p className="text-xs text-gray-600">Interest Rate</p>
                            <p className="font-semibold text-gray-800">{card.rate}%</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-600">Statement Day</p>
                            <p className="font-semibold text-gray-800">{card.statementDay}th</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-600">Available Credit</p>
                            <p className="font-semibold text-gray-800">
                              ₱
                              {(card.limit - card.balance).toLocaleString('en-PH', {
                                minimumFractionDigits: 2,
                              })}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Summary */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4">Total Credit Card Summary</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-purple-100 text-sm">Total Debt</p>
                  <p className="text-2xl font-bold">
                    ₱{totalDebt.toLocaleString('en-PH', { minimumFractionDigits: 2 })}
                  </p>
                </div>
                <div>
                  <p className="text-purple-100 text-sm">Total Limit</p>
                  <p className="text-2xl font-bold">
                    ₱{totalLimit.toLocaleString('en-PH', { minimumFractionDigits: 0 })}
                  </p>
                </div>
                <div>
                  <p className="text-purple-100 text-sm">Total Min Payments</p>
                  <p className="text-2xl font-bold">
                    ₱{totalMinPayment.toLocaleString('en-PH', { minimumFractionDigits: 2 })}
                  </p>
                </div>
                <div>
                  <p className="text-purple-100 text-sm">Total Interest/mo</p>
                  <p className="text-2xl font-bold">
                    ₱{totalInterestPerMonth.toLocaleString('en-PH', { minimumFractionDigits: 2 })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TRAVEL TAB */}
        {activeTab === 'travel' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold text-purple-900 flex items-center gap-2">
                <Plane className="w-8 h-8" />
                Travel Planning
              </h2>
              <button
                onClick={handleAddTrip}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:shadow-lg transition"
              >
                <Plus className="w-4 h-4" />
                Add Trip
              </button>
            </div>

            {trips.map((trip) => {
              const tripExpenses = trip.expenses.reduce((sum, exp) => sum + exp.amount, 0);
              const paidExpenses = trip.expenses
                .filter((exp) => exp.paid)
                .reduce((sum, exp) => sum + exp.amount, 0);

              return (
                <div
                  key={trip.id}
                  className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800">{trip.name}</h3>
                      <p className="text-gray-600">
                        {trip.destination} • {trip.startDate} to {trip.endDate}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDeleteTrip(trip.id)}
                      className="text-red-500 hover:text-red-700 transition"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-6 pb-6 border-b border-gray-200">
                    <div>
                      <p className="text-gray-600 text-sm">Total Cost</p>
                      <p className="text-2xl font-bold text-gray-800">
                        ₱{tripExpenses.toLocaleString('en-PH', { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm">Paid</p>
                      <p className="text-2xl font-bold text-green-600">
                        ₱{paidExpenses.toLocaleString('en-PH', { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm">Remaining</p>
                      <p className="text-2xl font-bold text-orange-600">
                        ₱
                        {(tripExpenses - paidExpenses).toLocaleString('en-PH', {
                          minimumFractionDigits: 2,
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    {trip.expenses.map((expense) => (
                      <div
                        key={expense.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex-1">
                          <p className="font-semibold text-gray-800">{expense.description}</p>
                          <p className="text-sm text-gray-600">
                            {expense.type.charAt(0).toUpperCase() + expense.type.slice(1)} •{' '}
                            {expense.card
                              ? creditCards.find((c) => c.id === expense.card)?.name.substring(0, 15)
                              : 'Cash'}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-lg font-bold text-gray-800">
                            ₱{expense.amount.toLocaleString('en-PH', { minimumFractionDigits: 2 })}
                          </span>
                          <button
                            onClick={() => handleDeleteTripExpense(trip.id, expense.id)}
                            className="text-red-500 hover:text-red-700 transition"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => handleAddTripExpense(trip.id)}
                    className="w-full px-4 py-2 border-2 border-dashed border-purple-300 text-purple-600 rounded-lg hover:bg-purple-50 transition flex items-center justify-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add Expense
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* GROCERIES TAB */}
        {activeTab === 'groceries' && (
          <div className="space-y-8">
            {Object.entries(groceriesByCategory).map(([category, items]) => {
              const monthlyTotal = items.reduce(
                (sum, item) => sum + calculateMonthlyEquivalent(item.frequencyDays, item.price),
                0
              );
              const needsPurchase = items.filter((i) => i.status === 'needs purchase').length;

              return (
                <div key={category} className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-4 pb-4 border-b-2 border-purple-200">
                    <div>
                      <h3 className="text-2xl font-bold text-purple-900">{category}</h3>
                      <p className="text-sm text-gray-600">
                        Monthly equivalent: ₱{monthlyTotal.toLocaleString('en-PH', { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                    {needsPurchase > 0 && (
                      <span className="px-3 py-1 bg-red-100 text-red-700 text-sm font-semibold rounded-full">
                        {needsPurchase} items due
                      </span>
                    )}
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-purple-200">
                          <th className="text-left py-2 px-3 font-semibold text-gray-800">Item</th>
                          <th className="text-left py-2 px-3 font-semibold text-gray-800">Frequency</th>
                          <th className="text-right py-2 px-3 font-semibold text-gray-800">Price</th>
                          <th className="text-right py-2 px-3 font-semibold text-gray-800">
                            Monthly Equiv
                          </th>
                          <th className="text-left py-2 px-3 font-semibold text-gray-800">
                            Last Purchased
                          </th>
                          <th className="text-left py-2 px-3 font-semibold text-gray-800">
                            Next Purchase
                          </th>
                          <th className="text-center py-2 px-3 font-semibold text-gray-800">Status</th>
                          <th className="text-center py-2 px-3 font-semibold text-gray-800">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {items.map((item) => {
                          const nextPurchase = getNextPurchaseDate(
                            item.lastPurchased,
                            item.frequencyDays
                          );
                          const today = new Date().toISOString().split('T')[0];
                          const isDue = nextPurchase <= today;
                          const monthlyEquiv = calculateMonthlyEquivalent(
                            item.frequencyDays,
                            item.price
                          );

                          return (
                            <tr
                              key={item.id}
                              className={`border-b border-purple-100 ${
                                isDue ? 'bg-red-50' : 'hover:bg-purple-50'
                              } transition`}
                            >
                              <td className="py-3 px-3 font-medium text-gray-800">{item.name}</td>
                              <td className="py-3 px-3 text-gray-600">{item.frequency}</td>
                              <td className="py-3 px-3 text-right font-semibold">
                                ₱{item.price.toLocaleString('en-PH', { minimumFractionDigits: 2 })}
                              </td>
                              <td className="py-3 px-3 text-right text-gray-700">
                                ₱{monthlyEquiv.toLocaleString('en-PH', { minimumFractionDigits: 2 })}
                              </td>
                              <td className="py-3 px-3 text-gray-600">{item.lastPurchased}</td>
                              <td className="py-3 px-3 text-gray-600">{nextPurchase}</td>
                              <td className="py-3 px-3 text-center">
                                <span
                                  className={`px-2 py-1 text-xs font-semibold rounded ${
                                    isDue
                                      ? 'bg-red-200 text-red-800'
                                      : 'bg-green-200 text-green-800'
                                  }`}
                                >
                                  {isDue ? 'Needs Purchase' : 'Stocked'}
                                </span>
                              </td>
                              <td className="py-3 px-3 text-center">
                                {isDue && (
                                  <button
                                    onClick={() => handleMarkGroceryPurchased(item.id)}
                                    className="text-green-600 hover:text-green-800 transition"
                                  >
                                    <Check className="w-4 h-4" />
                                  </button>
                                )}
                              </td>
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

        {/* CALENDAR TAB */}
        {activeTab === 'calendar' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-purple-900">
                  {monthNames[currentMonth]} {currentYear}
                </h2>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-purple-100 rounded-lg transition">
                    <ChevronLeft className="w-5 h-5 text-purple-600" />
                  </button>
                  <button className="p-2 hover:bg-purple-100 rounded-lg transition">
                    <ChevronRight className="w-5 h-5 text-purple-600" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-2 mb-4">
                {dayNames.map((day) => (
                  <div
                    key={day}
                    className="text-center py-2 font-semibold text-gray-700 bg-purple-100 rounded"
                  >
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-2">
                {calendarDays.map((day, idx) => {
                  if (!day)
                    return <div key={`empty-${idx}`} className="aspect-square bg-gray-50 rounded" />;

                  const events = getEventsForDay(day, currentMonth, currentYear);

                  return (
                    <div
                      key={day}
                      className="aspect-square border-2 border-purple-200 rounded-lg p-2 bg-white hover:bg-purple-50 transition cursor-pointer relative"
                    >
                      <p className="font-semibold text-gray-800 text-sm">{day}</p>
                      <div className="mt-1 space-y-1">
                        {events.slice(0, 2).map((event, idx) => (
                          <div
                            key={idx}
                            className={`text-xs px-1 rounded truncate text-white font-semibold ${
                              event.type === 'income'
                                ? 'bg-green-500'
                                : event.type === 'statement'
                                  ? 'bg-orange-500'
                                  : event.type === 'bill'
                                    ? 'bg-red-500'
                                    : event.type === 'subscription'
                                      ? 'bg-blue-500'
                                      : 'bg-purple-500'
                            }`}
                          >
                            {event.label}
                          </div>
                        ))}
                        {events.length > 2 && (
                          <p className="text-xs text-gray-600 px-1">+{events.length - 2} more</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Calendar Legend */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-bold text-gray-800 mb-4">Event Legend</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded" />
                  <span className="text-sm text-gray-700">Pay Day</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-orange-500 rounded" />
                  <span className="text-sm text-gray-700">Statement</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded" />
                  <span className="text-sm text-gray-700">Bills Due</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded" />
                  <span className="text-sm text-gray-700">Subscription</span>
                </div>
              </div>
            </div>

            {/* Monthly Summary */}
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl shadow-lg p-6">
              <h3 className="text-2xl font-bold mb-4">
                {monthNames[currentMonth]} Summary
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-purple-100 text-sm">Pay Days</p>
                  <p className="text-2xl font-bold">2</p>
                </div>
                <div>
                  <p className="text-purple-100 text-sm">Expected Income</p>
                  <p className="text-2xl font-bold">₱{monthlyIncome.toLocaleString('en-PH', { minimumFractionDigits: 0 })}</p>
                </div>
                <div>
                  <p className="text-purple-100 text-sm">Recurring Costs</p>
                  <p className="text-2xl font-bold">
                    ₱{(totalSubscriptions + totalFixedBills).toLocaleString('en-PH', { minimumFractionDigits: 0 })}
                  </p>
                </div>
                <div>
                  <p className="text-purple-100 text-sm">Available Buffer</p>
                  <p className="text-2xl font-bold">₱2,500</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyLedger;
