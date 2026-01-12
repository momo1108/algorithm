package test2;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.StringTokenizer;

public class BOJ4 {
    // https://www.acmicpc.net/workbook/view/7976

    // 변수 설정
    static FastReader fr = new FastReader();
    static int N, M, K, MAX = 9999999;
    static int[] C;
    static int[][] D;

    // 입력 함수
    static void input(){
        N = fr.nextInt();
        M = fr.nextInt();
        D = new int[N + 1][N + 1];

        for (int i = 0; i <= N; i++) {
            for (int j = 0; j <= N; j++) {
                D[i][j] = MAX;
            }
            D[i][i] = 0;
        }

        for (int i = 0; i < M; i++) {
            D[fr.nextInt()][fr.nextInt()] = fr.nextInt();
        }

        K = fr.nextInt();
        C = new int[K];

        for (int i = 0; i < K; i++) {
            C[i] = fr.nextInt();
        }
    }

    static void fw(){
        for (int i = 1; i <= N; i++) {
            for (int j = 1; j <= N; j++) {
                if(j == i)continue;
                for (int k = 1; k <= N; k++) {
                    if(k == i || k == j) continue;
                    D[j][k] = Math.min(D[j][k], D[j][i] + D[i][k]);
                }
            }
        }

        int min = MAX;
        ArrayList<Integer> answer = new ArrayList<>();
        for (int i = 1; i <= N; i++) {
            int max = -1;
            for(int c : C){
                max = Math.max(max, D[c][i] + D[i][c]);
            }
            if(max < min) {
                min = max;
                answer.clear();
                answer.add(i);
            } else if(max == min){
                answer.add(i);
            }
        }
        
        StringBuilder sb = new StringBuilder();
        for(Integer c : answer) sb.append(c).append(' ');
        System.out.println(sb);
    }

    public static void main(String[] args) throws Exception {
        input();
        fw();
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