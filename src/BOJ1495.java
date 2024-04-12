import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class BOJ1495 {
    // https://www.acmicpc.net/problem/

    // 변수 설정
    static FastReader fr = new FastReader();
    static int N, S, M;
    static int[] diff;

    // 입력 함수
    static void input(){
        N = fr.nextInt();
        S = fr.nextInt();
        M = fr.nextInt();
        diff = new int[N+1];

        for (int i = 1; i <= N; i++) {
            diff[i] = fr.nextInt();
        }
    }

    static void dp(){
        boolean[][] Dy = new boolean[N+1][M+1];
        if(S + diff[1] <= M) Dy[1][S + diff[1]] = true;
        if(S - diff[1] >= 0) Dy[1][S - diff[1]] = true;

        for (int song = 2; song <= N; song++) {
            boolean cantChange = true;
            for (int vol = 0; vol <= M; vol++) {
                if(!Dy[song - 1][vol]) continue;
                if(vol + diff[song] <= M) {
                    Dy[song][vol + diff[song]] = true;
                    cantChange = false;
                }
                if(vol - diff[song] >= 0) {
                    Dy[song][vol - diff[song]] = true;
                    cantChange = false;
                }
            }
            if(cantChange){
                System.out.println(-1);
                return;
            }
        }

        int answer = -1;
        for (int vol = 0; vol <= M; vol++) {
            if(Dy[N][vol]) answer = vol;
        }
        System.out.println(answer);
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