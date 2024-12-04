--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2
-- Dumped by pg_dump version 16.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS '';


--
-- Name: LeaveStatusEnum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."LeaveStatusEnum" AS ENUM (
    'Pending',
    'Approved',
    'Declined'
);


ALTER TYPE public."LeaveStatusEnum" OWNER TO postgres;

--
-- Name: Role; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."Role" AS ENUM (
    'USER',
    'ADMIN'
);


ALTER TYPE public."Role" OWNER TO postgres;

--
-- Name: StatusEnum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."StatusEnum" AS ENUM (
    'Present',
    'Absent',
    'Leave'
);


ALTER TYPE public."StatusEnum" OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Attendance; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Attendance" (
    id integer NOT NULL,
    "userId" text NOT NULL,
    date timestamp(3) without time zone NOT NULL,
    status public."StatusEnum" DEFAULT 'Absent'::public."StatusEnum" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Attendance" OWNER TO postgres;

--
-- Name: Attendance_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Attendance_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Attendance_id_seq" OWNER TO postgres;

--
-- Name: Attendance_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Attendance_id_seq" OWNED BY public."Attendance".id;


--
-- Name: Grade; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Grade" (
    id text NOT NULL,
    grade text NOT NULL,
    "minAttendance" integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Grade" OWNER TO postgres;

--
-- Name: Leave; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Leave" (
    id integer NOT NULL,
    "userId" text NOT NULL,
    "startDate" timestamp(3) without time zone NOT NULL,
    "endDate" timestamp(3) without time zone NOT NULL,
    status public."LeaveStatusEnum" DEFAULT 'Pending'::public."LeaveStatusEnum" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "leaveReason" text
);


ALTER TABLE public."Leave" OWNER TO postgres;

--
-- Name: Leave_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Leave_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Leave_id_seq" OWNER TO postgres;

--
-- Name: Leave_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Leave_id_seq" OWNED BY public."Leave".id;


--
-- Name: User; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."User" (
    id text NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    password character varying(255) NOT NULL,
    "profilePicture" text,
    role public."Role" DEFAULT 'USER'::public."Role" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."User" OWNER TO postgres;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- Name: Attendance id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Attendance" ALTER COLUMN id SET DEFAULT nextval('public."Attendance_id_seq"'::regclass);


--
-- Name: Leave id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Leave" ALTER COLUMN id SET DEFAULT nextval('public."Leave_id_seq"'::regclass);


--
-- Data for Name: Attendance; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Attendance" (id, "userId", date, status, "createdAt") FROM stdin;
99	cm499fm8l00001l8gu02liexr	2024-12-03 19:00:00	Leave	2024-12-04 02:20:53.587
100	cm499fm8l00001l8gu02liexr	2024-12-04 19:00:00	Leave	2024-12-04 02:20:53.587
101	cm499fm8l00001l8gu02liexr	2024-12-05 19:00:00	Leave	2024-12-04 02:20:53.587
102	cm499fm8l00001l8gu02liexr	2024-12-06 19:00:00	Leave	2024-12-04 02:20:53.587
103	cm499fm8l00001l8gu02liexr	2024-12-07 19:00:00	Leave	2024-12-04 02:20:53.587
104	cm499fm8l00001l8gu02liexr	2024-12-08 19:00:00	Leave	2024-12-04 02:20:53.587
105	cm499fm8l00001l8gu02liexr	2024-12-09 19:00:00	Leave	2024-12-04 02:20:53.587
106	cm499fm8l00001l8gu02liexr	2024-12-10 19:00:00	Leave	2024-12-04 02:20:53.587
107	cm499fm8l00001l8gu02liexr	2024-12-11 19:00:00	Leave	2024-12-04 02:20:53.587
108	cm499fm8l00001l8gu02liexr	2024-12-17 19:00:00	Leave	2024-12-04 03:22:06.692
\.


--
-- Data for Name: Grade; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Grade" (id, grade, "minAttendance", "createdAt", "updatedAt") FROM stdin;
cm49cgg1100071lj0au36dohu	A+	95	2024-12-04 03:44:17.696	2024-12-04 03:44:17.696
cm49cgm3x00081lj0w2l47s70	A	90	2024-12-04 03:44:25.582	2024-12-04 03:44:25.582
\.


--
-- Data for Name: Leave; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Leave" (id, "userId", "startDate", "endDate", status, "createdAt", "leaveReason") FROM stdin;
64	cm499fm8l00001l8gu02liexr	2024-12-03 19:00:00	2024-12-11 19:00:00	Approved	2024-12-04 02:20:20.615	I want leave for vacations
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."User" (id, name, email, password, "profilePicture", role, "createdAt", "updatedAt") FROM stdin;
cm4733ytc00011logmjjo7exe	Admin	admin@example.com	$2b$10$4xyERgVFntYPdlU0Bzo.We8eGwPJV2aY1QToUHNAt3HUjU09IhVcK	\N	ADMIN	2024-12-02 13:47:06.625	2024-12-02 13:47:06.625
cm48oc7r200001lbw2l69bss0	Noor ul hassan	noorulhassan@email.com	$2b$10$MQJiXpT0Ow8aEEecATd9I.hGIDyy7h06qHBlKQFh0ZAITEDSxO9fe	\N	USER	2024-12-03 16:29:09.498	2024-12-03 16:29:09.498
cm499fm8l00001l8gu02liexr	Noor ul hassan	dragonwarrior.com@gmail.com	$2b$10$sLuNEoAEpqVYSmd9Q5RnHegeAT2Eyx98OUCs5YKmsIverVGlA3q3a	\N	USER	2024-12-04 02:19:40.165	2024-12-04 02:19:40.165
cm49ci8s400091lj01vs2wpax	Noor ul hasssan	nuh25792@gmail.com	$2b$10$RdqXQsm84BPbsAHfMSw8oO/DfH3dYTuz4JkonyiFsaLplFkd6UG1q	\N	USER	2024-12-04 03:45:41.619	2024-12-04 03:45:41.619
cm49ivgx200001lgs5xpync10	Noor ul hassan	nuh25792@mail.com	$2b$10$F2zKtmDj1gM5o2UOabAlpuy1H1TEj0WVNdr7bmVPq1v7Iopz33DcW	\N	USER	2024-12-04 06:43:56.387	2024-12-04 06:43:56.387
cm49j7y0o00001lwsqtrrlo06	NUH	nuh2579@mail.com	$2b$10$RfQTu5KMfQCbEY3zJD7Qr.1IbakSUbMXZgNpyT02Eeu7e.1vAQFRy	https://utfs.io/f/5VMv7A6IVNahtUEWVSdfnlvg4TX1dB87YeOAEUFwhaKjWPqJ	USER	2024-12-04 06:53:38.422	2024-12-04 06:55:53.727
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
c87586b9-ea17-4e7f-992d-bf4b00e1a460	d8c65cfaf482adfc43fb5e24285af2667c680bb134cd6f2cb85f1e8255309581	2024-12-01 18:24:43.442005+05	20241130083654_dev	\N	\N	2024-12-01 18:24:43.401634+05	1
e4c3c4ff-79db-4f17-84e8-be21aefa2c86	c02342d0a4a3bbf8c786b32cd4aada6a6e4e4d5d66cd5c1df64bcb248b53657b	2024-12-01 18:24:43.466937+05	20241201132213_initial_migration	\N	\N	2024-12-01 18:24:43.443129+05	1
32b0e94f-6d98-4c24-bb74-85c3aa4f768f	fe4ff73f388ebef10ca54825a9fd8bd7c8a86e460a2387a492f7a4b7d093390f	2024-12-01 20:58:01.316201+05	20241201155801_leave	\N	\N	2024-12-01 20:58:01.293575+05	1
9c7a0d1e-9f08-44f9-aaa5-5460edb853f8	4432b6ef7488f64a39d73ffb6ffb7444665c5b471c373fb89d15fb3c1799b162	2024-12-02 11:45:00.680332+05	20241202064500_composite_key_added	\N	\N	2024-12-02 11:45:00.658224+05	1
0008227b-9080-452b-9c1a-af644d5c9882	700148c27d4980c3ef99f5bc2025d7b5d94e3bdc5843bf96143ddb91e3ffffe4	2024-12-03 17:03:17.922286+05	20241203120317_grade	\N	\N	2024-12-03 17:03:17.880202+05	1
\.


--
-- Name: Attendance_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Attendance_id_seq"', 108, true);


--
-- Name: Leave_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Leave_id_seq"', 64, true);


--
-- Name: Attendance Attendance_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Attendance"
    ADD CONSTRAINT "Attendance_pkey" PRIMARY KEY (id);


--
-- Name: Grade Grade_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Grade"
    ADD CONSTRAINT "Grade_pkey" PRIMARY KEY (id);


--
-- Name: Leave Leave_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Leave"
    ADD CONSTRAINT "Leave_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: Attendance_userId_date_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Attendance_userId_date_key" ON public."Attendance" USING btree ("userId", date);


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: Attendance Attendance_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Attendance"
    ADD CONSTRAINT "Attendance_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Leave Leave_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Leave"
    ADD CONSTRAINT "Leave_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

