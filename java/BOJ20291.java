import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.StringTokenizer;

public class BOJ20291 {
    // https://www.acmicpc.net/problem/

    // 변수 설정
    static FastReader fr = new FastReader();
    static int N;
    static String[] Ext;

    // 입력 함수
    static void input(){
        N = fr.nextInt();
        Ext = new String[N];
        for (int i = 0; i < N; i++) {
            String line = fr.nextLine();
            String[] sline = line.split("\\.");
            Ext[i] = sline[1];
        }
    }

    public static void main(String[] args) throws Exception {
        input();

        Arrays.sort(Ext);

        StringBuilder sb = new StringBuilder();

        String currentExt = Ext[0];
        int count = 1;
        for (int i = 1; i < N; i++) {
            if(!Ext[i].equals(currentExt)) {
                sb.append(currentExt).append(' ').append(count).append('\n');
                count = 1;
                currentExt = Ext[i];
            } else {
                count++;
            }
        }
        sb.append(currentExt).append(' ').append(count).append('\n');

        System.out.println(sb);

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