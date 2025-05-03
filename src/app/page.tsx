'use client';

import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { AlertCircle, CheckCircle, Droplets, Monitor, Moon, Award, Calendar, TrendingUp, Settings, CalendarIcon, Flame, Circle } from 'lucide-react';
import { RadialBarChart, RadialBar, PolarAngleAxis } from 'recharts';
import { Zain } from 'next/font/google';
import { motion } from "framer-motion";


const zain = Zain({
  subsets: ['latin'],
  weight: ['200', '300', '400', '700', '800', '900'], // use available weights
})

const data = [
  {
    name: 'Progress',
    value: 70,
    fill: '#6366f1', // Tailwind indigo-500
  },
];

export function Card({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`}
      {...props}
    />
  )
}

export function CardHeader({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props} />
  )
}

export function CardTitle({ className = "", ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className}`} {...props} />
  )
}

export function CardDescription({ className = "", ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={`text-sm text-muted-foreground ${className}`} {...props} />
  )
}

export function CardContent({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`p-6 pt-0 ${className}`} {...props} />
  )
}

export function CardFooter({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`flex items-center p-6 pt-0 ${className}`} {...props} />
  )
}

export default function HabitTracker() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [waterIntake, setWaterIntake] = useState(4);
  const [sleepHours, setSleepHours] = useState(7);
  const [screenTime, setScreenTime] = useState(3);

  // Sample data for the charts
  const weeklyData = [
    { day: 'Mon', water: 6, sleep: 7, screen: 4 },
    { day: 'Tue', water: 8, sleep: 8, screen: 3 },
    { day: 'Wed', water: 5, sleep: 6, screen: 5 },
    { day: 'Thu', water: 7, sleep: 7, screen: 2 },
    { day: 'Fri', water: 8, sleep: 9, screen: 3 },
    { day: 'Sat', water: 4, sleep: 8, screen: 6 },
    { day: 'Sun', water: 6, sleep: 7, screen: 4 },
  ];

  const streakData = [
    { habit: 'Water', streak: 5, goal: 8, completed: true },
    { habit: 'Sleep', streak: 12, goal: 8, completed: true },
    { habit: 'Meditation', streak: 3, goal: 10, completed: false },
    { habit: 'Exercise', streak: 7, goal: 30, completed: true },
    { habit: 'Reading', streak: 0, goal: 15, completed: false },
  ];

  const [habits, setHabits] = useState([
    { id: 1, name: 'Water', isCompleted: true, color: 'bg-green-500' },
    { id: 2, name: 'Read', isCompleted: true, color: 'bg-blue-500' },
    { id: 3, name: 'Meditate', isCompleted: false, color: 'bg-amber-400' },
    { id: 4, name: 'Exercise', isCompleted: false, color: 'bg-purple-400' },
  ]);

  const [currentMonth] = useState('May 2025');
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const calendarData = [
    { day: 1, habits: [1, 2, 4] },
    { day: 2, habits: [2, 3] },
    { day: 3, habits: [2, 3, 4] },
    { day: 4, habits: [1, 3] },
    { day: 5, habits: [1, 3] },
    { day: 6, habits: [] },
    { day: 7, habits: [2, 3] },
    { day: 8, habits: [1, 2, 3, 4] },
    { day: 9, habits: [1, 3] },
    { day: 10, habits: [2, 3] },
    { day: 11, habits: [] },
    { day: 12, habits: [1, 2] },
    { day: 13, habits: [1, 3] },
    { day: 14, habits: [1, 3, 4] },
    { day: 15, habits: [1, 2] },
    { day: 16, habits: [2, 3] },
    { day: 17, habits: [1, 3] },
    { day: 18, habits: [1, 3] },
    { day: 19, habits: [1, 4] },
    { day: 20, habits: [1, 3] },
    { day: 21, habits: [4] },
    { day: 22, habits: [1, 3] },
    { day: 23, habits: [1, 2] },
    { day: 24, habits: [2, 3] },
    { day: 25, habits: [1, 2] },
    { day: 26, habits: [] },
    { day: 27, habits: [1, 2] },
    { day: 28, habits: [] }, 
    { day: 29, habits: [] },
    { day: 30, habits: [] },
    { day: 31, habits: [] },
  ];

  const insights = {
    completionRate: 78,
    longestStreak: 14,
    missedDays: 6
  };
  
  // Sample goals data
  const goals = [
    { habit: 'Water', progress: 78, target: '78%' },
    { habit: 'Meditate', progress: 70, target: '14 days' },
    { habit: 'Sleep', progress: 40, target: '8 days', completed: false }
  ];

  const [newGoals, setNewGoals] = useState([
    { habit: 'Sleep', unit: 'hours', target: 8, isCompleted: false },
    { habit: 'Water', unit: 'glasses', target: 8, isCompleted: false },
    { habit: 'Screen Time', unit: 'hours', target: 4, isCompleted: false },
  ]);

  const [habitName, setHabitName] = useState('');
  const [habitTarget, setHabitTarget] = useState('');
  const [habitUnit, setHabitUnit] = useState('');
  const [display, setDisplay] = useState(false);

  const [isStreakEnabled, setIsStreakEnabled] = useState(true);
  const [isRegularTipEnabled, setIsRegularTipEnabled] = useState(true);

  const addHabit = () => {
    if (habitName.trim() === '' || habitTarget === '' || habitUnit.trim() === '') return;

    const newHabit = {
      habit: habitName,
      unit: habitUnit,
      target: habitTarget,
      isCompleted: false,
    };

    setNewGoals([...newGoals, newHabit]);
    setHabitName('');
    setHabitTarget('');
    setHabitUnit('');
    setDisplay(false);
  };
  
  const toggleHabit = (ht) => {
    setNewGoals((prev) =>
      prev.map((habit) =>
        habit.habit === ht ? { ...habit, isCompleted: !habit.isCompleted } : habit
      )
    );
  };

  const [final, setFinal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFinal(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);
  

  return (
    <div className={`flex flex-col h-screen bg-gray-50 ${zain.className}`}>
      {/* Top Navigation */}
      <header className="bg-indigo-600 text-white p-4 px-20 max-sm:px-3">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">HabitTrack</h1>
          <div className="flex items-center space-x-2">
            <span className="text-lg">User</span>
            <div className="w-8 h-8 rounded-full bg-indigo-300 flex items-center justify-center">
              U
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-4 px-20 max-sm:px-3">
        {activeTab === 'dashboard' && (
          <>
            {/* Daily Check-in Card */}

          <h1 className='mt-8 font-bold text-4xl max-sm:text-3xl'>Hi John! You're on a <span className='text-blue-600'>7-day</span> streak — keep the momentum going!</h1>
          <p className='mb-8 mt-2 text-lg'>Keep adding new habits and complete them by crossing them in Habits section below :)</p>

          <div className='flex max-sm:flex-col max-sm:gap-3 items-start gap-10'>
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="bg-white rounded-lg shadow p-2 mb-6 w-1/4 max-sm:w-full relative"
          >
              <Card className='border-white shadow-white'>
                <CardHeader>
                  <div className='flex items-center justify-between'>
                    <div className="text-2xl font-bold">
                    Daily Goals <span className='text-lg'>(Out of 20)</span>
                    </div>
                    <div className='bg-gray-300 rounded-full p-2 cursor-pointer hover:bg-gray-400 transition duration-200'
                      onClick={() => setDisplay(true)}
                    >
                    Add new
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  {/* Sleep */}
                  {newGoals.map((goal, index) => {
                    return (
                      <div key={index}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-medium text-xl">{goal.habit}</span>
                          <span className="text-xl font-semibold">{goal.target} <span className="text-muted-foreground">{goal.unit}</span></span>
                        </div>
                        <input
                          type="range"
                          min={0}
                          max={20}
                          step={0.5}
                          value={goal.target}
                          onChange={(e) => {
                            const newValue = parseFloat(e.target.value);
                            setNewGoals((prev) =>
                              prev.map((habit) =>
                                habit.habit === goal.habit ? { ...habit, target: newValue } : habit
                              )
                            );
                          }}
                          className="w-full accent-black"
                        />
                      </div>
                    )
                  })}

                  <div className={`space-y-2 absolute top-0 p-2 right-0 bg-gray-200 w-80 ${display == false ? 'hidden' : null}`}>
                    <p className='text-xl text-center'>Add new Habit</p>
                    <input
                      type="text"
                      placeholder="Habit Name"
                      className="border border-gray-300 rounded-lg p-2 w-full mt-2"
                      value={habitName}
                      onChange={(e) => setHabitName(e.target.value)}
                    />

                    <input
                      type="number"
                      placeholder="Habit Target"
                      className="border border-gray-300 rounded-lg p-2 w-full mt-2"
                      value={habitTarget}
                      onChange={(e) => setHabitTarget(e.target.value)}
                      max={20}
                    />

                    <input
                      type="text"
                      placeholder="Measuring Unit"
                      className="border border-gray-300 rounded-lg p-2 w-full mt-2"
                      value={habitUnit}
                      onChange={(e) => setHabitUnit(e.target.value)}
                    />

                    <button
                      className='w-full text-xl mt-3 bg-green-400 text-white rounded-lg px-4 py-2 font-semibold hover:bg-green-500 transition duration-200'
                      onClick={addHabit}
                    >
                      Add New Habit
                    </button>
                  </div>

                  {/* <button className='w-full text-xl mt-3 bg-green-400 text-white rounded-lg px-4 py-2 font-semibold hover:bg-green-500 transition duration-200'>
                    Set Today's Goals
                  </button> */}
                </CardContent>
              </Card>
            </motion.div>

      
            
            {/* Weekly Progress Chart */}
            <div className="bg-white rounded-lg shadow p-5 mb-6 flex-2 h-84 max-sm:w-full">
              <h2 className="text-2xl font-bold mb-4">Weekly Progress</h2>
              <div className="h-64 -ml-10">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="water" stroke="#3B82F6" name="Water (glasses)" />
                    <Line type="monotone" dataKey="sleep" stroke="#6366F1" name="Sleep (hours)" />
                    <Line type="monotone" dataKey="screen" stroke="#EF4444" name="Screen Time (hours)" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className='w-1/4 max-sm:w-full mb-10'
            >

              <div className="space-y-3"> {/* Stacked vertically */}
                {/* Streak Card */}
                {isStreakEnabled ? <div className="rounded-lg p-4 shadow-sm bg-white">
                  <div className="flex items-center space-x-2 mb-2">
                  <motion.div
                    animate={
                      final
                        ? { scale: 1, color: "#3b82f6" } // blue-500
                        : { scale: [1, 1.5, 1], color: ['#f97316', '#f97316', '#f97316'] } // orange-500 pulsing
                    }
                    transition={
                      final
                        ? { duration: 0.6 }
                        : {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 0.6,
                            ease: "easeInOut",
                          }
                    }
                  >
                    <Flame className="h-5 w-5" />
                  </motion.div>
                    <h3 className="text-xl font-semibold">Streak</h3>
                  </div>
                  <p className="text-3xl font-bold text-black">7 days</p>
                </div> : null}

                {/* Days Completed Card */}
                <div className="rounded-lg p-4 shadow-sm bg-white">
                  <div className="flex items-center space-x-2 mb-2">
                    <CalendarIcon className="text-blue-500 h-5 w-5" />
                    <h3 className="text-xl font-semibold">Days Completed</h3>
                  </div>
                  <p className="text-3xl font-bold text-black">23</p>
                </div>

                <div className="rounded-lg p-4 shadow-sm bg-white">
                  <div className="flex items-center space-x-2 mb-2">
                    <CalendarIcon className="text-blue-500 h-5 w-5" />
                    <h3 className="text-xl font-semibold">Daily Quote</h3>
                  </div>
                  <p className="text-3xl font-bold text-black">Keep going on</p>
                </div>
              </div>
            </motion.div>
          </div>
            
            {/* Streaks Section */}
            <div className='flex max-sm:flex-col items-start gap-10'>
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className='w-1/4 max-sm:w-full'
            >
                  <Card className="md:col-span-1 border-white bg-white">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold">Habits</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {newGoals.map((habit) => (
                        <div key={habit.habit} className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={habit.isCompleted}
                            onChange={() => toggleHabit(habit.habit)}
                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                            <label
                              htmlFor={`habit-${habit.habit}`}
                              className={`text-xl font-medium leading-none ${
                                habit.isCompleted ? "line-through text-muted-foreground" : ""
                              }`}
                            >
                              {habit.habit}
                            </label>
                          </div>

                          {habit.isCompleted && (
                            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-white">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="bg-white rounded-lg shadow p-6 flex-1 max-sm:w-full"
              >
                <h2 className="text-2xl font-bold mb-4">Current Streaks</h2>
                <div className="space-y-2">
                  {streakData.map((streak, index) => (
                    <div key={index} className={`flex items-center justify-between h-16 px-3 rounded-sm ${index%2==0 ? 'bg-[#eef8ff]' : null}`}>
                      <div className="flex items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${streak.completed ? 'bg-green-200 text-green-600' : 'bg-gray-200 text-gray-600'}`}>
                          {streak.completed ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                        </div>
                        <div className="ml-3">
                          <p className="font-medium text-xl">{streak.habit}</p>
                          <p className="text-lg text-gray-500">Goal: {streak.goal} days</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Award size={17} className="mr-1 text-yellow-500" />
                        <span className="font-bold text-lg">{streak.streak} days</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </>
        )}
        
        {activeTab === 'analytics' && (
          <>
            <div className="bg-white rounded-lg shadow p-6 mb-6 flex max-sm:flex-col max-sm:gap-3 items-start gap-10">
              <div className='flex-1 max-sm:w-full'>
                <h2 className="text-2xl font-bold mb-4">Monthly Performance</h2>
                <div className="h-64 ">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={[
                      { name: 'Water', completion: 85 },
                      { name: 'Sleep', completion: 92 },
                      { name: 'Exercise', completion: 70 },
                      { name: 'Meditation', completion: 45 },
                      { name: 'Reading', completion: 62 },
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="completion" fill="#8884d8" name="Completion %" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className='flex-1 max-sm:w-full'>
                <h2 className="text-2xl font-bold mb-4">Weekly Performance</h2>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={[
                      { name: 'Water', completion: 90 },
                      { name: 'Sleep', completion: 48 },
                      { name: 'Exercise', completion: 66 },
                      { name: 'Meditation', completion: 32 },
                      { name: 'Reading', completion: 90 },
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="completion" fill="#4f7cf7" name="Completion %" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                className="rounded-lg shadow p-6"
              >
                  <h2 className="text-2xl font-bold mb-4">Average Habit Completion</h2>
                  <div className="rounded-lg relative flex flex-1 items-center justify-center">
                    <RadialBarChart
                      width={200}
                      height={200}
                      cx="50%"
                      cy="50%"
                      innerRadius="80%"
                      outerRadius="100%"
                      barSize={20}
                      data={data}
                      startAngle={90}
                      endAngle={-270}
                    >
                      <PolarAngleAxis
                        type="number"
                        domain={[0, 100]}
                        angleAxisId={0}
                        tick={false}
                      />
                      <RadialBar
                        background
                        clockWise
                        dataKey="value"
                      />
                    </RadialBarChart>
                    <div className="absolute text-center">
                      <span className="text-3xl font-semibold">70%</span>
                    </div>
                  </div>
              </motion.div>

              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }} 
                className="bg-white rounded-lg shadow p-6"
              >
                <h2 className="text-2xl font-bold mb-4">Longest Streaks</h2>
                <div className="space-y-4 text-xl">
                  <div className="flex justify-between items-center">
                    <span>Sleep</span>
                    <span className="font-bold">32 days</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Water Intake</span>
                    <span className="font-bold">26 days</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Exercise</span>
                    <span className="font-bold">14 days</span>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                className="bg-white rounded-lg shadow p-6"
              >
                <h2 className="text-2xl font-bold mb-4">Areas to Improve</h2>
                <div className="space-y-4 text-xl">
                  <div className="flex justify-between items-center">
                    <span>Meditation</span>
                    <span className="text-red-500">45% completion</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Reading</span>
                    <span className="text-red-500">62% completion</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Screen Time Limit</span>
                    <span className="text-red-500">58% success</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
        
        {activeTab === 'calendar' && (
          <div className="bg-white rounded-lg shadow p-6 max-sm:p-2">
            
            {/* Main Content */}
            <main className="flex-1 p-4 max-sm:p-1">
              {/* Calendar Header */}
              <div className="flex justify-between max-sm:flex-col items-start mb-4">
                <h2 className="text-3xl max-sm:text-2xl font-bold">Everyday Activity Calendar</h2>
                <div className="flex items-center">
                  {isStreakEnabled ? <div className="flex items-center">
                    <Flame className="text-orange-500 mr-2" />
                    <span className="font-semibold text-2xl max-sm:text-xl">7-Day Streak</span>
                  </div> : null}
                  <div className="ml-4 border border-gray-500 rounded p-2 max-sm:p-1 max-sm:text-lg text-xl">{currentMonth}</div>
                </div>
              </div>
              
              {/* Habit Legend */}
              <div className="flex gap-4 mb-4">
                {habits.map(habit => (
                  <div key={habit.id} className="flex items-center text-base">
                    <div className={`w-3 h-3 rounded-full ${habit.color} mr-2`}></div>
                    <span>{habit.name}</span>
                  </div>
                ))}
              </div>
              
              {/* Calendar Grid */}
              <div className="mb-20 max-sm:mb-8">
                {/* Days of Week */}
                <div className="grid grid-cols-7 mb-2 text-xl">
                  {daysOfWeek.map(day => (
                    <div key={day} className="text-center font-medium">{day}</div>
                  ))}
                </div>
                
                {/* Calendar Days */}
                <div className="grid grid-cols-7 gap-1">
                  {calendarData.map(day => (
                    <div 
                      key={day.day}
                      className={`border border-gray-400 rounded p-2 h-16 flex flex-col ${day.habits.length === 0 ? 'bg-red-100' : ''}`}
                    >
                      <div className="font-semibold mb-1">{day.day}</div>
                      <div className="flex gap-1 flex-wrap">
                        {habits.map(habit => (
                          day.habits.includes(habit.id) && (
                            <div 
                              key={habit.id} 
                              className={`w-3 h-3  max-sm:w-2 max-sm:h-2 rounded-full ${habit.color}`}
                            ></div>
                          )
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Bottom Panels */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Insights Panel */}
                <div className="border border-gray-400 rounded-lg p-4 text-xl">
                  <h3 className="text-2xl font-bold mb-4">Insights Summary</h3>
                  
                  <div className="mb-4">
                    <div className="flex justify-between mb-1">
                      <span>Completion Rate</span>
                      <span>{insights.completionRate}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full" 
                        style={{ width: `${insights.completionRate}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between mb-4">
                    <span>Longest Streak</span>
                    <span>{insights.longestStreak} days</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>Missed Days</span>
                    <div className="flex items-center">
                      <span>{insights.missedDays} days</span>
                    </div>
                  </div>
                </div>
                
                {/* Goals Panel */}
                <div className="border border-gray-400 rounded-lg p-4 text-xl">
                  <h3 className="text-2xl font-bold mb-4">This Month's Goals</h3>
                  
                  {goals.map((goal, index) => (
                    <div key={index} className="mb-4">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center">
                          {goal.completed !== false ? 
                            <CheckCircle className="mr-2 text-gray-700" size={20} /> : 
                            <Circle className="mr-2 text-gray-700" size={20} />
                          }
                          <span>{goal.habit}</span>
                        </div>
                        <span>{goal.target}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full" 
                          style={{ width: `${goal.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>

                {isRegularTipEnabled ? <div className="border border-gray-400 rounded-lg p-4 text-xl">
                  <h3 className="text-2xl font-bold mb-4">Tips for Missed Days</h3>
                  <ul className="list-disc list-inside">
                    <li>Try to set reminders for your goals</li>
                    <li>Even if you do too little, note it consistently</li>
                    <li>Try completing the easiest task</li>
                    <li>Never miss two days in a row</li>
                    <li>Make a quick note on why the habit wasn’t done.</li>
                  </ul>
                </div> : null}

              </div>
            </main>

          </div>
        )}
        
        {activeTab === 'settings' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-3xl font-bold mb-4">Settings</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-2 text-xl">Notifications</h3>
                <div className="flex items-center justify-between py-2">
                  <span>Regular Tips</span>
                  <div
                    className={`relative inline-block w-12 h-6 rounded-full transition-colors duration-300 cursor-pointer ${
                      isRegularTipEnabled ? 'bg-green-500' : 'bg-indigo-600'
                    }`}
                    onClick={() => setIsRegularTipEnabled(!isRegularTipEnabled)}
                  >
                    <div
                      className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform duration-300 ${
                        isRegularTipEnabled ? 'translate-x-7' : 'translate-x-1'
                      }`}
                    ></div>
                  </div>
                </div>

                <div className="flex items-center justify-between py-2">
                  <span>Streak Achievements</span>
                  <div
                    className={`relative inline-block w-12 h-6 rounded-full transition-colors duration-300 cursor-pointer ${
                      isStreakEnabled ? 'bg-green-500' : 'bg-indigo-600'
                    }`}
                    onClick={() => setIsStreakEnabled(!isStreakEnabled)}
                  >
                    <div
                      className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform duration-300 ${
                        isStreakEnabled ? 'translate-x-7' : 'translate-x-1'
                      }`}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="bg-white border-t border-gray-200 p-4">
        <div className="flex justify-around">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`hover:cursor-pointer flex flex-col items-center ${activeTab === 'dashboard' ? 'text-indigo-600' : 'text-gray-500'}`}
          >
            <CheckCircle size={20} />
            <span className="text-base mt-1">Dashboard</span>
          </button>
          <button 
            onClick={() => setActiveTab('analytics')}
            className={`hover:cursor-pointer flex flex-col items-center ${activeTab === 'analytics' ? 'text-indigo-600' : 'text-gray-500'}`}
          >
            <TrendingUp size={20} />
            <span className="text-base mt-1">Analytics</span>
          </button>
          <button 
            onClick={() => setActiveTab('calendar')}
            className={`hover:cursor-pointer flex flex-col items-center ${activeTab === 'calendar' ? 'text-indigo-600' : 'text-gray-500'}`}
          >
            <Calendar size={20} />
            <span className="text-base mt-1">Calendar</span>
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`hover:cursor-pointer flex flex-col items-center ${activeTab === 'settings' ? 'text-indigo-600' : 'text-gray-500'}`}
          >
            <Settings size={20} />
            <span className="text-base mt-1">Settings</span>
          </button>
        </div>
      </nav>
    </div>
  );
}