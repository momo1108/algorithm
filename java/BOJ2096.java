import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class BOJ2096 {
    // https://www.acmicpc.net/problem/

    // 변수 설정
    static FastReader fr = new FastReader();
    static int N;
    static int[][] map;

    // 입력 함수
    static void input(){
        N = fr.nextInt();
        map = new int[N][3];

        for (int i = 0; i < N; i++) {
            map[i][0] = fr.nextInt();
            map[i][1] = fr.nextInt();
            map[i][2] = fr.nextInt();
        }
    }

    static void dp(){
        int[][][] Dy = new int[N][3][2];
        // 행, 열, 최소/최대
        for (int i = 0; i < 3; i++) {
            Dy[0][i][0] = map[0][i];
            Dy[0][i][1] = map[0][i];
        }

        for (int row = 1; row < N; row++) {
            for (int col = 0; col < 3; col++) {
                int min = 1000000, max = -1;
                for(int prevCol : new int[]{col-1, col, col+1}){
                    if(prevCol < 0 || prevCol > 2) continue;
                    min = Math.min(min, Dy[row - 1][prevCol][0]);
                    max = Math.max(max, Dy[row - 1][prevCol][1]);
                }
                Dy[row][col][0] = min + map[row][col];
                Dy[row][col][1] = max + map[row][col];
            }
        }

        int min = 1000000, max = -1;
        for (int i = 0; i < 3; i++) {
            min = Math.min(min, Dy[N-1][i][0]);
            max = Math.max(max, Dy[N-1][i][1]);
        }

        System.out.println(max + " " + min);
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