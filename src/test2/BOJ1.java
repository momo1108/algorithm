package test2;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.Queue;
import java.util.StringTokenizer;

public class BOJ1 {
    // https://www.acmicpc.net/workbook/view/7976

    // 변수 설정
    static FastReader fr = new FastReader();
    static int N, M, X;
    static boolean[] visit;
    static ArrayList<Integer>[] graph;

    // 입력 함수
    static void input(){
        N = fr.nextInt();
        M = fr.nextInt();
        visit = new boolean[N + 1];
        graph = new ArrayList[N + 1];

        for (int i = 0; i < N; i++) {
            graph[i + 1] = new ArrayList<>();
        }

        int first, last;
        for (int i = 0; i < M; i++) {
            first = fr.nextInt();
            last = fr.nextInt();
            graph[last].add(first);
        }

        X = fr.nextInt();
    }

    static void bfs(){
        Queue<Integer> q = new LinkedList<>();
        int count = 0;
        q.add(X);

        while(!q.isEmpty()){
            int v = q.poll();

            for(Integer n : graph[v]){
                if(visit[n]) continue;
                visit[n] = true;
                q.add(n);
                count++;
            }
        }

        System.out.println(count);
    }

    public static void main(String[] args) throws Exception {
        input();
        bfs();
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