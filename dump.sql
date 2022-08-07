--
-- PostgreSQL database dump
--

-- Dumped from database version 14.4 (Ubuntu 14.4-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.4 (Ubuntu 14.4-0ubuntu0.22.04.1)

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: customers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.customers (
    id integer NOT NULL,
    name character varying(40) NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    "createAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.customers OWNER TO postgres;

--
-- Name: customers_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.customers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.customers_id_seq OWNER TO postgres;

--
-- Name: customers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.customers_id_seq OWNED BY public.customers.id;


--
-- Name: sessions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sessions (
    id integer NOT NULL,
    token text NOT NULL,
    "customerId" integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.sessions OWNER TO postgres;

--
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sessions_id_seq OWNER TO postgres;

--
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;


--
-- Name: urls; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.urls (
    id integer NOT NULL,
    "shortUrl" character varying(9) NOT NULL,
    url text NOT NULL,
    "customerId" integer NOT NULL,
    "visitCount" integer DEFAULT 0 NOT NULL,
    "createAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.urls OWNER TO postgres;

--
-- Name: urls_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.urls_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.urls_id_seq OWNER TO postgres;

--
-- Name: urls_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.urls_id_seq OWNED BY public.urls.id;


--
-- Name: customers id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customers ALTER COLUMN id SET DEFAULT nextval('public.customers_id_seq'::regclass);


--
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);


--
-- Name: urls id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.urls ALTER COLUMN id SET DEFAULT nextval('public.urls_id_seq'::regclass);


--
-- Data for Name: customers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.customers (id, name, email, password, "createAt") FROM stdin;
1	Vinicius Pacheco dos Santos	vinicius@gmail.com	$2b$10$xTevCIAO8IDwEPV2pnokp.V/0uNXBqH657rcizW3rEvLFRy5Fy2dC	2022-08-06 15:59:50.649638
2	teste1	teste1@gmail.com	$2b$10$vyrniGxNbaYNF.qkgRRTGOWbqID.20v5Yp.YqH4wmwuUziMLx4gX6	2022-08-07 12:08:36.404932
3	teste2	teste2@gmail.com	$2b$10$RJlj.oDYVwUB0EqvgG9NCuaEveMDOXQHpQdE9tLpZ5KDZsqP8rb6C	2022-08-07 12:08:48.397142
4	teste3	teste3@gmail.com	$2b$10$MFPH1QJIlDsBaD3993tSHeYAaJkESx4OArqfEdixVKH4yfJGn4Q1.	2022-08-07 12:09:01.974558
5	teste4	teste4@gmail.com	$2b$10$1P4pBplfMvhY9vw5OX9KcOIOfwS0uMuWsHA.NjY4yR2eIg3.kt4gu	2022-08-07 12:09:15.061674
6	teste5	teste5@gmail.com	$2b$10$rcQDUmlrKtNUVXNrT1h55uouw8v2KLYy/tTUBnCffg2lT4GUh6Api	2022-08-07 12:09:27.82965
7	teste6	teste6@gmail.com	$2b$10$CPJSFde3Om7HJ0wfV3CYG.VxVuExw.eXjjO3OKoH03onX7HXzwhbS	2022-08-07 12:10:20.278634
8	teste7	teste7@gmail.com	$2b$10$AnBFIHvLIlVpM2DtrooiveVi.5wo999ynchh9kiDaF0MOlRDkXE2.	2022-08-07 12:10:31.085273
9	teste8	teste8@gmail.com	$2b$10$.Ti1xjG9BJf1V9o0lMzlDOD8KU4jFrsg.9IvqMCRQMOokrJBfGVry	2022-08-07 12:10:44.020967
10	teste9	teste9@gmail.com	$2b$10$PB7OCT45qkNfJLn.5TFUc.ob5cPues5yC4ptV/aW8RZcrKUV6XOXG	2022-08-07 12:10:55.91398
11	teste10	teste10@gmail.com	$2b$10$Ycayv75cOkYwaKjR/yZQlu5P.LK41fPLaHUKwQS/fd0TxUROnlrj.	2022-08-07 12:11:06.445015
\.


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sessions (id, token, "customerId", "createdAt") FROM stdin;
1	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IlZpbmljaXVzIFBhY2hlY28gZG9zIFNhbnRvcyIsImVtYWlsIjoidmluaWNpdXNAZ21haWwuY29tIiwiY3JlYXRlQXQiOiIyMDIyLTA4LTA2VDE4OjU5OjUwLjY0OVoiLCJpYXQiOjE2NTk4ODUzMzAsImV4cCI6MTY2MjQ3NzMzMH0.HjZaxST9PvNsp7xfCn6C3Jsq4387Z-LycxO1M4M0g7A	1	2022-08-06 16:00:00.470708
\.


--
-- Data for Name: urls; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.urls (id, "shortUrl", url, "customerId", "visitCount", "createAt") FROM stdin;
1	2sITF6NY1	https://youtube.com/	1	1	2022-08-06 16:00:15.494766
2	0555TJVNH	https://google.com/	1	1	2022-08-06 16:00:23.111898
3	iVPZrC4xW	https://mangahosted.com	1	1	2022-08-06 16:00:31.194968
\.


--
-- Name: customers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.customers_id_seq', 11, true);


--
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.sessions_id_seq', 2, true);


--
-- Name: urls_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.urls_id_seq', 4, true);


--
-- Name: customers customers_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_email_key UNIQUE (email);


--
-- Name: customers customers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_customerId_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT "sessions_customerId_key" UNIQUE ("customerId");


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_token_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_token_key UNIQUE (token);


--
-- Name: urls urls_customerId_url_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT "urls_customerId_url_key" UNIQUE ("customerId", url);


--
-- Name: urls urls_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_pkey PRIMARY KEY (id);


--
-- Name: urls urls_shortUrl_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT "urls_shortUrl_key" UNIQUE ("shortUrl");


--
-- Name: sessions sessions_customerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT "sessions_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES public.customers(id);


--
-- Name: urls urls_customerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT "urls_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES public.customers(id);


--
-- PostgreSQL database dump complete
--

