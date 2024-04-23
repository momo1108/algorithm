package test2;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;
import java.util.TreeSet;

public class BOJ3 {
    // https://www.acmicpc.net/workbook/view/7976

    // 변수 설정
    static FastReader fr = new FastReader();
    static int N, M;
    static int[] diff;
    static TreeSet<Question> Q = new TreeSet<>();
    static class Question implements Comparable<Question>{
        int number, difficulty;

        public Question(int n, int d){
            this.number = n;
            this.difficulty = d;
        }
        
        @Override
        public int compareTo(Question o) {
            return this.difficulty == o.difficulty? this.number - o.number : this.difficulty - o.difficulty;
        }
    }

    // 입력 함수
    static void input(){
        N = fr.nextInt();
        diff = new int[100001];

        for (int i = 0; i < N; i++) {
            Question q = new Question(fr.nextInt(), fr.nextInt());
            Q.add(q);
            diff[q.number] = q.difficulty;
        }

        M = fr.nextInt();
    }

    static void solve(){
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < M; i++) {
            String line = fr.nextLine();
            String[] sl = line.split(" ");
            String command = sl[0];
            if(command.equals("recommend")){
                if(sl[1].equals("1")) sb.append(Q.last().number).append('\n');
                else sb.append(Q.first().number).append('\n');
            } else if(command.equals("add")){
                Question q = new Question(Integer.parseInt(sl[1]), Integer.parseInt(sl[2]));
                diff[q.number] = q.difficulty;
                Q.add(q);
            } else if(command.equals("solved")){
                int num = Integer.parseInt(sl[1]);
                Q.remove(new Question(num, diff[num]));
            }
        }
        System.out.println(sb);
    }

    public static void main(String[] args) throws Exception {
        input();
        solve();
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