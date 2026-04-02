CREATE TABLE workers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  phone TEXT,
  platform TEXT NOT NULL,
  city TEXT NOT NULL,
  zone TEXT NOT NULL,
  shift_start TIME NOT NULL,
  shift_end TIME NOT NULL,
  working_days INT NOT NULL DEFAULT 6,
  weekly_earnings NUMERIC NOT NULL,
  upi_id TEXT NOT NULL,
  upi_verified BOOLEAN DEFAULT FALSE,
  role TEXT DEFAULT 'worker',
  risk_score INT,
  risk_tier TEXT,
  verification_tier INT DEFAULT 1,
  device_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE policies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  worker_id UUID REFERENCES workers(id),
  week_start DATE NOT NULL,
  week_end DATE NOT NULL,
  premium_paid NUMERIC NOT NULL,
  max_payout NUMERIC NOT NULL,
  coverage_pct NUMERIC NOT NULL,
  verification_tier INT NOT NULL,
  status TEXT DEFAULT 'ACTIVE',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE disruption_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type TEXT NOT NULL,
  city TEXT NOT NULL,
  zones TEXT[] NOT NULL,
  trigger_value NUMERIC,
  trigger_source TEXT NOT NULL,
  started_at TIMESTAMPTZ NOT NULL,
  ended_at TIMESTAMPTZ,
  workers_affected INT DEFAULT 0,
  total_payout NUMERIC DEFAULT 0,
  status TEXT DEFAULT 'ACTIVE'
);

CREATE TABLE claims (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  worker_id UUID REFERENCES workers(id),
  policy_id UUID REFERENCES policies(id),
  disruption_id UUID REFERENCES disruption_events(id),
  shift_overlap_hours NUMERIC,
  lost_income NUMERIC,
  payout_amount NUMERIC,
  fraud_score INT,
  fraud_signals TEXT[],
  fraud_verdict TEXT,
  status TEXT DEFAULT 'PROCESSING',
  reviewer_action TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  paid_at TIMESTAMPTZ
);

CREATE TABLE payouts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  claim_id UUID REFERENCES claims(id),
  worker_id UUID REFERENCES workers(id),
  upi_id TEXT NOT NULL,
  amount NUMERIC NOT NULL,
  razorpay_ref TEXT,
  status TEXT DEFAULT 'PENDING',
  initiated_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

