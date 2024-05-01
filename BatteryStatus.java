

import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.os.BatteryManager;

public class BatteryStatus {
    private Context mContext;

    public BatteryStatus(Context context) {
        mContext = context;
    }

    public boolean isBatterySaverEnabled() {
        IntentFilter intentFilter = new IntentFilter(Intent.ACTION_BATTERY_CHANGED);
        Intent batteryStatusIntent = mContext.registerReceiver(null, intentFilter);
        if (batteryStatusIntent != null) {
            int batteryStatus = batteryStatusIntent.getIntExtra(BatteryManager.EXTRA_STATUS, -1);
            return batteryStatus == BatteryManager.BATTERY_STATUS_POWER_SAVE;
        }
        return false;
    }
}
