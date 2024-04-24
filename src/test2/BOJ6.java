package test2;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.HashMap;
import java.util.StringTokenizer;

public class BOJ6 {
    // https://www.acmicpc.net/workbook/view/7976

    // 변수 설정
    static FastReader fr = new FastReader();
    static int N, L = 0, F;
    static HashMap<String, Customer> customerInfo = new HashMap<>();
    static class Customer{
        HashMap<String, Integer> record = new HashMap<>();
        long fine = 0;

        public void check(String parts, int timestamp){
            if(record.containsKey(parts)) {
                Integer r = record.get(parts);
                int fineTime = timestamp - r - L;
                if(fineTime > 0) fine += (fineTime * F);
                record.remove(parts);
            } else record.put(parts, timestamp);
        }
    }

    // 입력 함수
    static void input(){
        String S = fr.nextLine();
        String[] ss = S.split(" ");
        N = Integer.parseInt(ss[0]);
        F = Integer.parseInt(ss[2]);
        String[] rentalPeriod = ss[1].split("/|:");
        L += (Integer.parseInt(rentalPeriod[0]) * 24 * 60);
        L += (Integer.parseInt(rentalPeriod[1]) * 60);
        L += Integer.parseInt(rentalPeriod[2]);
    }

    static int getTimestamp(String date, String time){
        String[] sd = date.split("-");
        String[] st = time.split(":");
        int[] daysTillMonth = {0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334};
        int t = 0;
        t += (daysTillMonth[Integer.parseInt(sd[1]) - 1] * 24 * 60);
        t += (Integer.parseInt(sd[2]) * 24 * 60);
        t += (Integer.parseInt(st[0]) * 60);
        t += Integer.parseInt(st[1]);
        return t;
    }

    static void solve(){
        String line;
        String[] sl;
        int timestamp;
        for (int i = 0; i < N; i++) {
            line = fr.nextLine();
            sl = line.split(" ");
            timestamp = getTimestamp(sl[0], sl[1]);
            if(customerInfo.containsKey(sl[3])){
                Customer c = customerInfo.get(sl[3]);
                c.check(sl[2], timestamp);
            } else {
                Customer c = new Customer();
                c.check(sl[2], timestamp);
                customerInfo.put(sl[3], c);
            }
        }

        String[] names = customerInfo.keySet().toArray(new String[customerInfo.keySet().size()]);
        Arrays.sort(names);

        StringBuilder sb = new StringBuilder();
        for(String name : names){
            Customer c = customerInfo.get(name);
            if(c.fine > 0) sb.append(name).append(' ').append(c.fine).append('\n');
        }
        System.out.println(sb.length() == 0? -1 : sb);
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