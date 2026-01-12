package test1;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Collections;
import java.util.StringTokenizer;

public class BOJ7 {
    // https://www.acmicpc.net/workbook/view/7942

    // 변수 설정
    static FastReader fr = new FastReader();
    static int N, M;
    static long sum = 0;
    static int[] root;
    static ArrayList<Edge> E;
    static class Edge implements Comparable<Edge>{
        int n1, n2, cost;

        public Edge(int n1, int n2, int cost){
            this.n1 = n1;
            this.n2 = n2;
            this.cost = cost;
        }

        @Override
        public int compareTo(Edge o) {
            return this.cost - o.cost;
        }
    }

    // 입력 함수
    static void input(){
        N = fr.nextInt();
        M = fr.nextInt();

        root = new int[N + 1];
        E = new ArrayList<>();

        for (int i = 0; i <= N; i++) {
            root[i] = i;
        }

        int n1, n2, cost;
        for (int i = 0; i < M; i++) {
            n1 = fr.nextInt();
            n2 = fr.nextInt();
            cost = fr.nextInt();
            E.add(new Edge(n1, n2, cost));
            sum += cost;
        }

        Collections.sort(E);
    }

    static int findRoot(int node){
        if(root[node] == node) return node;
        else {
            root[node] = findRoot(root[node]);
            return root[node];
        }
    }

    static void kruskal(){
        long costSum = 0;
        int edgeCount = 0;
        
        for(Edge e : E){            
            int r1 = findRoot(e.n1);
            int r2 = findRoot(e.n2);
            if(r1 == r2) continue;
            root[r2] = r1;
            costSum += e.cost;
            edgeCount++;
            if(edgeCount == N - 1) break;
            // System.out.println("new : " + e.n1 + " " + e.n2 + " " + e.cost);
        }

        System.out.println(edgeCount == N - 1? sum - costSum : -1);
    }   

    public static void main(String[] args) throws Exception {
        input();
        kruskal();
    }

    static class FastReader {
        BufferedReader br;
        StringTokenizer st;

        public FastReader() {
            br = new BufferedReader(new InputStreamReader(System.in));
        }

        public FastReader(String s) throws FileNotFoundException {
            br = new BufferedReader(new FileReader(new File(s)));
        }

        String next() {
            while (st == null || !st.hasMoreElements()) {
                try {
                    st = new StringTokenizer(br.readLine());
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            return st.nextToken();
        }

        int nextInt() {
            return Integer.parseInt(next());
        }

        long nextLong() {
            return Long.parseLong(next());
        }

        double nextDouble() {
            return Double.parseDouble(next());
        }

        String nextLine() {
            String str = "";
            try {
                str = br.readLine();
            } catch (IOException e) {
                e.printStackTrace();
            }
            return str;
        }
    }
}