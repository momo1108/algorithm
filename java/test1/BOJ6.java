package test1;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class BOJ6 {
    // https://www.acmicpc.net/workbook/view/7942

    // 변수 설정
    static FastReader fr = new FastReader();
    static int N, M;
    static int[][] score;

    // 입력 함수
    static void input(){
        N = fr.nextInt();
        M = fr.nextInt();
        score = new int[N + 1][M + 1];

        for (int i = 1; i <= N; i++) {
            for (int j = 1; j <= M; j++) {
                score[i][j] = fr.nextInt();
            }
        }
    }

    static void dp(){
        // 각 자리별로 상승비행 최대점수 DP, 하강 비행 최대점수 DP
        // 구한 후 합이 최대가 되는 자리를 찾자.
        int[][] Dy_up = new int[N + 1][M + 1];
        int[][] Dy_down = new int[N + 1][M + 1];

        Dy_up[N][1] = score[N][1];
        for (int i = N; i >= 1; i--) {
            for (int j = 1; j <= M; j++) {
                if(i == N) Dy_up[i][j] = score[i][j] + Dy_up[i][j - 1];
                else if(j == 1) Dy_up[i][j] = score[i][j] + Dy_up[i + 1][j];
                else Dy_up[i][j] = score[i][j] + Math.max(Dy_up[i + 1][j], Dy_up[i][j - 1]);
            }
        }

        Dy_down[N][M] = score[N][M];
        for (int i = N; i >= 1; i--) {
            for (int j = M; j >= 1; j--) {
                if(i == N && j == M) continue;

                if(i == N) Dy_down[i][j] = score[i][j] + Dy_down[i][j + 1];
                else if(j == M) Dy_down[i][j] = score[i][j] + Dy_down[i + 1][j];
                else Dy_down[i][j] = score[i][j] + Math.max(Dy_down[i + 1][j], Dy_down[i][j + 1]);
            }
        }

        int max = -300000000;

        for (int i = 1; i <= N; i++) {
            for (int j = 1; j <= M; j++) {
                max = Math.max(max, Dy_up[i][j] + Dy_down[i][j]);
            }
        }

        System.out.println(max);
    }

    public static void main(String[] args) throws Exception {
        input();
        dp();
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