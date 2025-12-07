# Mock Data Setup Guide

## Overview

This application runs entirely on mock data - **no external API services required**. All data is simulated using in-memory mock objects, making it perfect for:

- **Demos and showcases**
- **Local development** without API keys
- **Testing UI/UX** without backend dependencies
- **Offline development**

**Note**: This is NOT a "mode" - all real API/DB code has been completely removed. This app only uses mock data.

## Quick Start

### 1. Install Dependencies

```bash
npm install --legacy-peer-deps
```

### 2. Run the Development Server

```bash
npm run dev
```

**No environment variables needed!** The app runs with mock data out of the box.

### 3. Access the Application

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Demo Credentials

### Default User Account

```
Email: demo@banking.com
Password: demo123
```

This account comes pre-loaded with:
- **3 bank accounts** (Chase Checking, BofA Savings, Wells Fargo Credit)
- **~60 mock transactions** over the past 90 days
- **2 transfer transaction records**

### Second Test Account

```
Email: jane.smith@example.com
Password: password123
```

## Features in Mock Mode

### ✅ Fully Functional

1. **Authentication**
   - Sign in with demo credentials
   - Sign up (creates mock user in memory)
   - Session persistence via localStorage
   - Logout functionality

2. **Dashboard**
   - View total balance across accounts
   - Recent transaction list
   - Account summaries
   - Charts and visualizations

3. **My Banks Page**
   - View all connected accounts
   - See account balances
   - Account details

4. **Transaction History**
   - Browse all transactions
   - Filter by account
   - Pagination support
   - Transaction categories

5. **Payment Transfer (UI Only)**
   - Transfer form validation
   - Visual balance updates
   - Transaction record creation
   - Success notifications

### ⚠️ Limitations

1. **No Real Bank Connections**
   - Plaid link is mocked
   - Adding banks only updates local state
   - No real institution connections

2. **No Real Transfers**
   - Transfers only update visual state
   - Balances change in memory only
   - No actual money movement

3. **Data Persistence**
   - Data resets on page refresh (except logged-in session)
   - No database backend
   - Changes only affect browser session

4. **No Real-Time Updates**
   - No live transaction syncing
   - No external data sources
   - All data is static mock data

## Mock Data Structure

### Users

Located in `lib/data/mock-data.ts`

```typescript
{
  $id: "mock-user-1",
  email: "demo@banking.com",
  firstName: "John",
  lastName: "Doe",
  // ... other user fields
}
```

### Banks & Accounts

```typescript
{
  $id: "mock-bank-1",
  accountId: "mock-account-chase-001",
  name: "Chase Checking",
  currentBalance: 15420.50,
  availableBalance: 15420.50,
  // ... other account fields
}
```

### Transactions

Generated dynamically with:
- Random amounts ($5-$500)
- Various categories (Food, Travel, Shopping, etc.)
- Date range: Last 90 days
- Mix of debits and credits

## Architecture

### Configuration Layer

**File**: `lib/config.ts`

```typescript
export const isMockMode = (): boolean => {
  // Checks NEXT_PUBLIC_USE_MOCK_DATA env variable
  // Or auto-detects missing API configuration
};
```

### Data Layer

**Files**: 
- `lib/data/mock-data.ts` - Static mock data definitions
- `lib/data/mock-state.ts` - In-memory state management

### Provider Layer

**Files**:
- `lib/providers/mock-auth.ts` - Authentication provider
- `lib/providers/mock-bank.ts` - Bank data provider
- `lib/providers/mock-transaction.ts` - Transaction provider

### Action Layer

**Files**: `lib/actions/*.actions.ts`

Each action file checks `isMockMode()` and delegates to either:
- Real API implementation (Appwrite, Plaid, Dwolla)
- Mock provider implementation

Example:

```typescript
export const getAccounts = async ({ userId }: getAccountsProps) => {
  if (isMockMode()) {
    return mockGetAccounts({ userId });
  }
  
  // Real Plaid API implementation
  // ...
};
```

## Switching Between Real and Mock Mode

### Option 1: Environment Variable (Recommended)

**.env.local**
```bash
# Mock mode
NEXT_PUBLIC_USE_MOCK_DATA=true
```

Remove or set to `false` for real API mode:
```bash
# Real API mode
NEXT_PUBLIC_USE_MOCK_DATA=false

# Then add your API keys
NEXT_PUBLIC_APPWRITE_ENDPOINT=...
PLAID_CLIENT_ID=...
# etc.
```

### Option 2: Auto-Detection

If `NEXT_PUBLIC_USE_MOCK_DATA` is not set, the app automatically enables mock mode when required API credentials are missing.

## Customizing Mock Data

### Adding Users

Edit `lib/data/mock-data.ts`:

```typescript
export const MOCK_USERS = [
  {
    $id: "mock-user-3",
    email: "your@email.com",
    password: "yourpassword",
    firstName: "Your",
    lastName: "Name",
    // ... other fields
  },
  // ... existing users
];
```

### Adding Banks/Accounts

```typescript
export const MOCK_BANKS = [
  {
    $id: "mock-bank-4",
    accountId: "mock-account-new-001",
    userId: "mock-user-1", // Link to user
    // ... other fields
  },
];

export const MOCK_ACCOUNTS = [
  {
    id: "mock-account-new-001",
    name: "My New Bank",
    currentBalance: 5000.00,
    // ... other fields
  },
];
```

### Modifying Transactions

The `generateMockTransactions()` function creates transactions dynamically. You can modify:
- Number of transactions
- Date range
- Categories
- Merchants
- Amount ranges

## Troubleshooting

### Issue: "Please log in to view..."

**Solution**: Navigate to `/sign-in` and use demo credentials:
- Email: `demo@banking.com`
- Password: `demo123`

### Issue: No data showing up

**Solution**: Check that mock mode is enabled:
```bash
# Verify .env.local contains:
NEXT_PUBLIC_USE_MOCK_DATA=true
```

### Issue: Data resets on refresh

**Expected behavior**: Mock data doesn't persist. Only the login session persists via localStorage.

### Issue: Build errors about fonts

**Solution**: The app now uses system font fallbacks. If you want Google Fonts:
1. Ensure internet access
2. Restore original font imports in `app/layout.tsx`

## Production Deployment

### Vercel/Netlify

Add environment variable:
```
NEXT_PUBLIC_USE_MOCK_DATA=true
```

### Docker

```dockerfile
ENV NEXT_PUBLIC_USE_MOCK_DATA=true
```

### Static Export

Mock mode works perfectly with `next export` for fully static sites.

## Security Considerations

### Demo Mode Indicator

Consider adding a visible indicator that the app is in demo mode:

```tsx
{process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true' && (
  <div className="demo-banner">
    🎭 DEMO MODE - Using simulated data
  </div>
)}
```

### Mock Passwords

Mock passwords are stored in plain text in the code. **Never use real passwords** in mock data.

### Production Use

For production demos:
1. Use mock mode
2. Add demo banner
3. Clear mock data after demos
4. Never expose real user data

## Advanced Configuration

### Custom Mock State

Create custom initial state:

```typescript
// lib/data/custom-state.ts
import { mockState } from './mock-state';

// Add custom user
mockState.createUser({
  email: 'custom@example.com',
  // ... fields
});

// Add custom transaction
mockState.addTransaction({
  // ... transaction data
});
```

### Per-Environment Configuration

```typescript
// lib/config.ts
export const isMockMode = (): boolean => {
  // Development: Always use mock
  if (process.env.NODE_ENV === 'development') {
    return true;
  }
  
  // Production: Check explicit flag
  return process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true';
};
```

## Support and Documentation

- **Migration Report**: See `MIGRATION_REPORT.md` for detailed architecture
- **Issues**: Report bugs in the GitHub repository
- **Questions**: Check existing issues or create a new one

## Future Enhancements

Potential improvements:
1. **LocalStorage Persistence**: Save mock data changes between sessions
2. **IndexedDB**: More robust client-side storage
3. **Mock API Server**: JSON Server for more realistic API simulation
4. **Data Import/Export**: Save and restore mock data states
5. **Admin Panel**: UI for managing mock data

---

**Version**: 1.0  
**Last Updated**: December 7, 2024  
**Maintainer**: GitHub Copilot
