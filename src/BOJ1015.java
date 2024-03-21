import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.StringTokenizer;

public class BOJ1015 {
    // https://www.acmicpc.net/problem/

    // 변수 설정
    static FastReader fr = new FastReader();
    static int N;
    static int[] P;
    static Elem[] A;

    static class Elem implements Comparable<Elem> {
        public int value, index;

        public Elem(int value, int index){
            this.value = value;
            this.index = index;
        }

        @Override
        public int compareTo(Elem o) {
            return value - o.value;
        }
    }

    // 입력 함수
    static void input(){
        N = fr.nextInt();
        A = new Elem[N];
        P = new int[N];

        int value;
        for(int i = 0; i < N; i++){
            value = fr.nextInt();
            A[i] = new Elem(value, i);
        }
    }

    public static void main(String[] args) throws Exception {
        input();
        // P 는 A 원소의 정렬 후 위치를 찾아주는 역할
        // P[i] 는 A[i] 가 몇번 index에 가야하는지 알려준다.
        // 따라서 A의 값과 인덱스를 같이 저장하고 정렬하면
        // 정렬된 값과 값의 원래 자리가 순서대로 나온다.
        // 앞에서부터 P[원래위치] = 현재위치 가 된다.
        Arrays.sort(A);
        for(int i = 0; i < N; i++){
            P[A[i].index] = i;
        }

        StringBuilder sb = new StringBuilder();
        for (int p : P) {
            sb.append(p).append(' ');
        }
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