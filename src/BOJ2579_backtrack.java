import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class BOJ2579_backtrack {
    // https://www.acmicpc.net/problem/

    // 변수 설정
    static FastReader fr = new FastReader();
    static int N;
    static int[] score;
    static int[][] Dy;
    static int[][][] Before;

    // 입력 함수
    static void input(){
        N = fr.nextInt();
        score = new int[N+1];
        Dy = new int[N+1][2];
        Before = new int[N+1][2][2];

        for (int i = 1; i <= N; i++) {
            score[i] = fr.nextInt();
        }
    }

    static void dp(){
        // Dy[i] : i번째 계단에서 최대점수
        // Dy[i][0~1] : i번재 계단 직전계단 밟은개수
        // 초기값 : Dy[1~2][0~2]
        Dy[1][0] = score[1];
        Dy[1][1] = score[1];
        Before[1][0] = new int[]{0, 0};
        Before[1][1] = new int[]{0, 0};
        if(N == 1) {
            System.out.println(score[1]);
            return;
        }
        Dy[2][0] = score[2];
        Dy[2][1] = score[1] + score[2];
        Before[2][0] = new int[]{0, 0};
        Before[2][1] = new int[]{1, 0};

        for (int i = 3; i <= N; i++) {
            if(Dy[i-2][0] >= Dy[i-2][1]){
                Dy[i][0] = Dy[i-2][0] + score[i];
                Before[i][0] = new int[]{i-2, 0};
            } else {
                Dy[i][0] = Dy[i-2][1] + score[i];
                Before[i][0] = new int[]{i-2, 1};
            }
            Dy[i][1] = Dy[i-1][0] + score[i];
            Before[i][1] = new int[]{i-1, 0};
        }

        StringBuilder sb = new StringBuilder();
        int[] last;
        if(Dy[N][0] >= Dy[N][1]) {
            sb.append(N + " " + 0).append('\n');
            last = Before[N][0];
        } else {
            sb.append(N + " " + 1).append('\n');
            last = Before[N][1];
        }

        while(last[0]>0){
            sb.append(last[0] + " " + last[1]).append('\n');
            last = Before[last[0]][last[1]];
        }

        System.out.println(sb);
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